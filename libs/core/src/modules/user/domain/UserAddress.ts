import { CompoundValueObject, Primitives } from '@ducen/shared';

export interface AddressUser {
  country: string;
  city: string;
  direction: string;
  postal: string;
}

export class UserAddress extends CompoundValueObject<AddressUser> {
  constructor({ city, country, direction, postal }: Primitives<AddressUser>) {
    super({
      city,
      country,
      direction,
      postal,
    });
  }

  public getValue(): AddressUser {
    return {
      city: this.value.city,
      country: this.value.country,
      direction: this.value.direction,
      postal: this.value.postal,
    };
  }
}
