import { CompoundValueObject } from '../Base/CompoundValueObject';
import { Coordinate } from './Coordinate';

export interface Coordinates {
  readonly latitude: Coordinate;
  readonly longitude: Coordinate;
}

export class GeoPoint extends CompoundValueObject<Coordinates> {
  constructor(x: number, y: number) {
    super({
      latitude: new Coordinate(x, 'x'),
      longitude: new Coordinate(y, 'y'),
    });
  }
  public getValue(): Coordinates {
    return {
      latitude: this.value.latitude,
      longitude: this.value.longitude,
    };
  }
}
