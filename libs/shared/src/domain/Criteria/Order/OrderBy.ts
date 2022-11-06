import { StringValueObject } from '../../ValueObjects/Generics/StringValueObject';

export class OrderBy extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}
