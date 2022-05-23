import { Aggregate } from '../../shared/domain/classes/Aggregate';
import { Nullable } from '../../shared/domain/types/Nullable';

export interface Repository<T extends Aggregate> {
  list(query: any): Promise<Array<T>>;
  get(id: string): Promise<Nullable<T>>;
  insert(data: T): Promise<void>;
  update(id: string, data: T): Promise<void>;
  delete(id: string): Promise<boolean>;
  count(): Promise<number>;
}
