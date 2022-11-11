import { Primitives } from '../../types/Primitives';
import { CompoundValueObject } from '../Base/CompoundValueObject';

export interface Coordinates {
  readonly latitude: number;
  readonly longitude: number;
}

export class GeoPoint extends CompoundValueObject<Coordinates> {
  constructor(data: Primitives<Coordinates>) {
    super({
      latitude: data.latitude,
      longitude: data.longitude,
    });
    this.validate(data);
  }

  protected validate(data: Primitives<Coordinates>): void {
    if ((data.latitude > 90 && data.latitude < -90) || (data.longitude > 180 && data.longitude < -180)) {
      throw new Error('Ejes fuera de valores');
    }
  }
  public getValue(): Coordinates {
    return {
      latitude: this.value.latitude,
      longitude: this.value.longitude,
    };
  }
}
