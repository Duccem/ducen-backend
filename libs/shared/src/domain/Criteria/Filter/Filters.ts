import { Filter } from './Filter';

export class Filters {
  readonly filters: Filter[];
  readonly exclusive: boolean;
  constructor(filters: Filter[], exclusive = false) {
    this.filters = filters;
    this.exclusive = exclusive;
  }

  static fromValues(filters: Array<Map<string, string>>, exclusive = false): Filters {
    return new Filters(filters.map(Filter.fromValues), exclusive);
  }

  static none(): Filters {
    return new Filters([]);
  }
}
