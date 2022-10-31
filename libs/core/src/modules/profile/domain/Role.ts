import { ErrorTypes, GeneralError } from '@ducen/adaptors';
import { EnumValueObject } from '@ducen/shared';

export enum Roles {
  SUPER = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  LEAD = 'LEAD',
  MEMBER = 'MEMBER',
}

export class Role extends EnumValueObject<Roles> {
  constructor(value: Roles) {
    super(value, Object.values(Roles));
  }
  protected throwErrorForInvalidValue(value: Roles): void {
    throw new GeneralError(ErrorTypes.INTERNAL, `The role ${value} is not valid`);
  }
}
