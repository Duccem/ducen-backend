import { StringValueObject } from '../../ValueObjects/Generics/StringValueObject';

export class LookUpEntity extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}
