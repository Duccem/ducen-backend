import { v4, validate } from 'uuid';
import { PrimitiveValueObject } from '../Base/PrimitiveValueObject';

export class UuidValueObject extends PrimitiveValueObject<string> {
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

  public validate(id: string): void {
    if (!validate(id)) {
      throw new Error(`<${UuidValueObject.name}> does not allow the value <${id}>`);
    }
  }

  public getValue(): string {
    return this.value.toString();
  }
}
