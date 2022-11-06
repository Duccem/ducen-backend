import { Primitive } from '../../types/Primitive';

export abstract class PrimitiveValueObject<T extends Primitive> {
  public value: T;
  constructor(value: T) {
    this.validate(value);
    this.value = value;
  }
  equals(other: PrimitiveValueObject<T>): boolean {
    return other.constructor.name === this.constructor.name && other.value === this.value;
  }
  public abstract validate(value: T): void;
  public abstract getValue(): T;
}
