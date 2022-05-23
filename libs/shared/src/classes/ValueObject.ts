import { Primitive } from '../types/Primitive';

export abstract class ValueObject {
  readonly value: Primitive;
  constructor(value: Primitive) {
    this.validate(value);
    this.value = value;
  }
  public abstract validate(value: Primitive): boolean;
  public abstract getValue(): Primitive;
}
