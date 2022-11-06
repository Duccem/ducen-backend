import { StringValueObject } from '../../ValueObjects/Generics/StringValueObject';

export class FilterField extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}
