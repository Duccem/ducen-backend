import { Filters } from './Filter/Filters';
import { Order } from './Order/Order';

export class Criteria {
  readonly filters: Filters;
  readonly order: Order;
  readonly limit?: number;
  readonly offset?: number;

  constructor(filters: Filters, order: Order, limit?: number, offset?: number) {
    this.filters = filters;
    this.order = order;
    this.limit = limit;
    this.offset = offset;
  }

  public hasFilter(): boolean {
    return this.filters.filters.length > 0;
  }
}
