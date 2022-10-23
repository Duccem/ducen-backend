import { Primitive } from '@ducen/shared/types/Primitive';
import { PrimitiveValueObject } from './PrimitiveValueObject';

export abstract class CompoundValueObject<
  T extends { [Property in keyof T]: CompoundValueObject<any> | PrimitiveValueObject<Primitive> | Primitive },
> {
  readonly value: T;
  constructor(data: T) {
    this.value = data;
  }

  public abstract getValue(): T;
}
