import { v4, validate } from 'uuid';
import { ValueObject } from '../ValueObject';

export class UuidValueObject extends ValueObject {
  constructor(value: string) {
    super(value);
  }

  public static random(): UuidValueObject {
    return new UuidValueObject(v4());
  }

  public static validateID(id: any): boolean {
    if (!validate(id)) return false;
    return true;
  }

  public validate(id: string): boolean {
    if (!validate(id)) {
      throw new Error(`<${UuidValueObject.name}> does not allow the value <${id}>`);
    }
    return true;
  }

  public getValue(): string {
    return this.value.toString();
  }
}
