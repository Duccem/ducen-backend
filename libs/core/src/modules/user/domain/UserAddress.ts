import { CompoundValueObject, GeoPoint } from '@ducen/shared';

export interface AddressUser {
  coordinates: GeoPoint;
  country: string;
  city: string;
  direction: string;
}

export class UserAddress extends CompoundValueObject<AddressUser> {
  constructor(points: { latitude: number; longitude: number }, country: string, city: string, direction: string) {
    super({
      coordinates: new GeoPoint(points.latitude, points.longitude),
      city,
      country,
      direction,
    });
  }

  public getValue(): AddressUser {
    return {
      city: this.value.city,
      country: this.value.country,
      direction: this.value.direction,
      coordinates: this.value.coordinates,
    };
  }

  public get coordinates() {
    return this.value.coordinates;
  }
}
