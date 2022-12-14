import { LookUp, Relationship } from '@ducen/shared';
import { Criteria } from '@ducen/shared/domain/Criteria/Criteria';
import { Filter } from '@ducen/shared/domain/Criteria/Filter/Filter';
import { Operator } from '@ducen/shared/domain/Criteria/Filter/FilterOperator';
import { Filters } from '@ducen/shared/domain/Criteria/Filter/Filters';
import { Order } from '@ducen/shared/domain/Criteria/Order/Order';

type MongoFilterOperator = '$eq' | '$ne' | '$gt' | '$lt' | '$regex' | '$in' | '$nin';
type MongoFilterValue = boolean | string | number | any;
type MongoFilterOperation = { [operator in MongoFilterOperator]?: MongoFilterValue };
type MongoFilter = { [field: string]: MongoFilterOperation } | { [field: string]: { $not: MongoFilterOperation } | MongoFilter[] };
type MongoDirection = 1 | -1;
type MongoSort = { [field: string]: MongoDirection };

interface MongoQuery {
  filter: MongoFilter;
  sort: MongoSort;
  skip: number;
  limit: number;
}

interface TransformerFunction<T, K> {
  (value: T): K;
}

export class MongoCriteriaConverter {
  private filterTransformers: Map<Operator, TransformerFunction<Filter, MongoFilter>>;

  constructor() {
    this.filterTransformers = new Map<Operator, TransformerFunction<Filter, MongoFilter>>([
      [Operator.EQUAL, this.equalFilter],
      [Operator.NOT_EQUAL, this.notEqualFilter],
      [Operator.GT, this.greaterThanFilter],
      [Operator.LT, this.lowerThanFilter],
      [Operator.CONTAINS, this.containsFilter],
      [Operator.NOT_CONTAINS, this.notContainsFilter],
    ]);
  }

  public convert(criteria: Criteria): MongoQuery {
    return {
      filter: criteria.hasFilter() ? this.generateFilter(criteria.filters) : {},
      sort: criteria.order.hasOrder() ? this.generateSort(criteria.order) : { _id: -1 },
      skip: criteria.offset || 0,
      limit: criteria.limit || 1,
    };
  }

  public lookUp(lookUps: LookUp[]): any[] {
    const lookups = lookUps.map((lookup) => {
      return this.generateLookUp(lookup);
    });
    const unwinds = lookUps
      .filter((l) => l.relationship.value === Relationship.MANY_TO_ONE)
      .map((lookup) => {
        return this.generateUnwind(lookup);
      });
    return [...lookups, ...unwinds];
  }

  protected generateLookUp(lookUp: LookUp) {
    const lookup = {
      $lookup: {
        from: lookUp.entity.value,
        localField: lookUp.entity.value,
        foreignField: '_id',
        as: lookUp.entity.value,
      },
    };
    return lookup;
  }

  protected generateUnwind(lookUp: LookUp) {
    const unwind = {
      $unwind: {
        path: `$${lookUp.entity.value}`,
        includeArrayIndex: 'string',
        preserveNullAndEmptyArrays: false,
      },
    };
    return unwind;
  }

  protected generateFilter(filters: Filters): MongoFilter {
    const filter = filters.filters.map((filter) => {
      const transformer = this.filterTransformers.get(filter.operator.value);

      if (!transformer) {
        throw Error(`Unexpected operator value ${filter.operator.value}`);
      }

      return transformer(filter);
    });
    if (filters.exclusive) {
      return { $or: [...filter] };
    }
    return Object.assign({}, ...filter);
  }

  protected generateSort(order: Order): MongoSort {
    return {
      [order.orderBy.value === 'id' ? '_id' : order.orderBy.value]: order.orderType.isAsc() ? 1 : -1,
    };
  }

  private equalFilter(filter: Filter): MongoFilter {
    return { [filter.field.value]: { $eq: filter.value.value } };
  }

  private notEqualFilter(filter: Filter): MongoFilter {
    return { [filter.field.value]: { $ne: filter.value.value } };
  }

  private greaterThanFilter(filter: Filter): MongoFilter {
    return { [filter.field.value]: { $gt: filter.value.value } };
  }

  private lowerThanFilter(filter: Filter): MongoFilter {
    return { [filter.field.value]: { $lt: filter.value.value } };
  }

  private containsFilter(filter: Filter): MongoFilter {
    return { [filter.field.value]: { $regex: filter.value.value } };
  }

  private notContainsFilter(filter: Filter): MongoFilter {
    return { [filter.field.value]: { $not: { $regex: filter.value.value } } };
  }
}
