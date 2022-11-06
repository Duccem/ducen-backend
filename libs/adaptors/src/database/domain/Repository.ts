import { Aggregate, Criteria, Nullable } from '@ducen/shared';

export interface Repository<T extends Aggregate> {
  get(id: string): Promise<Nullable<T>>;
  delete(id: string): Promise<boolean>;
  count(): Promise<number>;
  criteria(criteria: Criteria): Promise<T[]>;
  aggregate(aggregation: any[]): Promise<T[]>;
  persist(id: string, data: T): Promise<void>;
  exist(id: string): Promise<boolean>;
  search(text: string): Promise<T[]>;
}
