import { Aggregate, Constructor, Nullable } from '@ducen/shared';

export interface Store {
  set<T extends Aggregate>(model: Constructor<T>, val: T | Array<T>, time: number): Promise<boolean>;
  get<T extends Aggregate>(model: Constructor<T>, key?: string): Promise<Nullable<T | Array<T>>>;
  delete<T extends Aggregate>(model: Constructor<T>, key?: string): Promise<boolean>;
  count<T extends Aggregate>(model: Constructor<T>): Promise<number>;
  setCount<T extends Aggregate>(model: Constructor<T>, count: number): Promise<boolean>;
}
