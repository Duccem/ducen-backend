import { EnumValueObject } from '../../ValueObjects/Base/EnumValueObject';

export enum Relationship {
  ONE_TO_MANY = 'ONE_TO_MANY',
  MANY_TO_ONE = 'MANY_TO_ONE',
}
export class LookUpRelationship extends EnumValueObject<Relationship> {
  constructor(value: Relationship) {
    super(value, Object.values(Relationship));
  }

  static fromValue(value: string): LookUpRelationship {
    switch (value) {
      case Relationship.MANY_TO_ONE:
        return new LookUpRelationship(Relationship.MANY_TO_ONE);
      case Relationship.ONE_TO_MANY:
        return new LookUpRelationship(Relationship.ONE_TO_MANY);
      default:
        throw new Error(`The lookup relationship ${value} is invalid`);
    }
  }

  protected throwErrorForInvalidValue(value: Relationship): void {
    throw new Error(`The lookup relationship ${value} is invalid`);
  }
}
