import { PrimitiveValueObject } from '../Base/PrimitiveValueObject';

export abstract class StringValueObject extends PrimitiveValueObject<string> {
  public validate(value: string): void {
    if (value === null || value === undefined) {
      throw new Error('Value must be defined');
    }
  }
  public getValue(): string {
    return this.value;
  }
}
