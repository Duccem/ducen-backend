import { Primitive } from '@ducen/shared/domain/types/Primitive';
import { EnumValueObject } from './EnumValueObject';
import { PrimitiveValueObject } from './PrimitiveValueObject';

export abstract class CompoundValueObject<T extends { [Property in keyof T]: PrimitiveValueObject<Primitive> | EnumValueObject<any> | Primitive }> {
  readonly value: T;
  constructor(data: T) {
    this.value = data;
  }

  public abstract getValue(): T;
}
