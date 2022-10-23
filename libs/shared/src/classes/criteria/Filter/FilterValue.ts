import { StringValueObject } from '../../ValueObjects/Generics/StringValueObject';

export class FilterValue extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}
