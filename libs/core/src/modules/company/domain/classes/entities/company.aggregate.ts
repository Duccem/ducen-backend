import { Aggregate, UuidValueObject } from '@ducen/shared';
import { Exclude, Expose, instanceToPlain } from 'class-transformer';

export class Company extends Aggregate {
  @Exclude() private id: UuidValueObject;
  public principalData: any;
  public administrativeData: any;
  public configurationData: any;
  constructor(data: any) {
    super();
    this.id = data._id ? new UuidValueObject(data._id) : UuidValueObject.random();
    this.principalData = data.principalData;
    this.administrativeData = data.administrativeData;
    this.configurationData = data.configurationData;
  }
  @Expose({ name: '_id' })
  public get ID(): string {
    return this.id.getValue();
  }
  public toPrimitives(context?: string): any {
    return instanceToPlain(this, { groups: [context] });
  }
}
