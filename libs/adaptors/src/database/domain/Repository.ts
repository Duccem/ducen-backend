import { Aggregate, Criteria, JsonDocument, Nullable } from '@ducen/shared';

export interface Repository<T extends Aggregate> {
  list(limit?: number, offset?: number): Promise<Array<T>>;
  get(id: string): Promise<Nullable<T>>;
  insert(data: T): Promise<void>;
  update(id: string, data: JsonDocument<T>): Promise<void>;
  delete(id: string): Promise<boolean>;
  count(): Promise<number>;
  searchByCriteria(criteria: Criteria): Promise<T[]>;
  exist(id: string): Promise<boolean>;
}
