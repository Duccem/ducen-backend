import { MongoRepository } from '@ducen/adaptors';
import { MongoPrimitive } from '@ducen/adaptors/database/domain/MongoPrimitive';
import {
  Criteria,
  Filter,
  FilterField,
  FilterOperator,
  Filters,
  FilterValue,
  LookUp,
  LookUpEntity,
  LookUpRelationship,
  Nullable,
  Operator,
  Order,
  OrderBy,
  OrderType,
  OrderTypes,
  Relationship,
} from '@ducen/shared';
import { User } from '../domain/User';
import { UserRepository } from '../domain/UserRepository';

export class MongoUserRepository extends MongoRepository<User> implements UserRepository {
  async getOneByIdentifier(identifier: string): Promise<Nullable<User>> {
    const filterUserName = new Filter(new FilterField('username'), new FilterOperator(Operator.EQUAL), new FilterValue(identifier));
    const filterEmail = new Filter(new FilterField('email'), new FilterOperator(Operator.EQUAL), new FilterValue(identifier));
    const criteria = new Criteria(new Filters([filterUserName, filterEmail], true), new Order(new OrderBy('id'), new OrderType(OrderTypes.ASC)));
    const profileLookUp = new LookUp(new LookUpEntity('profile'), new LookUpRelationship(Relationship.MANY_TO_ONE));

    const { filter, limit, skip, sort } = this.converter.convert(criteria);
    const lookups = this.converter.lookUp([profileLookUp]);

    const user: MongoPrimitive<User> = await this.collection.aggregate(lookups).match(filter).limit(limit).skip(skip).sort(sort).toArray();

    if (user.length <= 0) return null;
    return new User(user.shift());
  }
}
