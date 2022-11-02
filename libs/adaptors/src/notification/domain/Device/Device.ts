import { Aggregate, JsonDocument } from '@ducen/shared';
import { instanceToPlain } from 'class-transformer';
import { DeviceType } from './DeviceType';

export class Device extends Aggregate {
  public user: string;
  public token: string;
  public type: DeviceType;

  constructor(data: JsonDocument<Device>) {
    super(data);
    this.user = data.user;
    this.token = data.token;
    this.type = data.type;
  }

  public toPrimitives(context?: string): JsonDocument<Device> {
    return instanceToPlain(this, { groups: [context] });
  }
}
