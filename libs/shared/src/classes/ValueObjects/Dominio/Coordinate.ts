import { PrimitiveValueObject } from '../Base/PrimitiveValueObject';

export class Coordinate extends PrimitiveValueObject<number> {
  private axis: string;
  constructor(value: number, axis: string) {
    super(value);
    this.axis = axis;
  }

  public validate(value: number): void {
    const limits = this.axis === 'x' ? [90, -90] : [180, -180];
    if (value > limits[0] || value < limits[1]) {
      throw new Error('Eje fuera de valores');
    }
  }

  public getValue(): number {
    return this.value;
  }
}
