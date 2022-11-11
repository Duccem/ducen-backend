import { Aggregate, Primitives } from '@ducen/shared';
import { instanceToPlain } from 'class-transformer';
import { DeviceType } from './DeviceType';

export class Device extends Aggregate {
  public user: string;
  public token: string;
  public type: DeviceType;

  constructor(data: Primitives<Device>) {
    super(data);
    this.user = data.user;
    this.token = data.token;
    this.type = data.type;
  }

  public toPrimitives<Device>(context?: string): Primitives<Device> {
    return <Primitives<Device>>instanceToPlain(this, { groups: [context] });
  }
}
