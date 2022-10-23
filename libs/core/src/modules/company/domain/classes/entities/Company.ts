import { Aggregate, JsonDocument, UuidValueObject } from '@ducen/shared';
import { Exclude, Expose, instanceToPlain } from 'class-transformer';
import { AdministrativeData, CompanyAdministrativeData } from './CompanyAdministrativeData';
import { CompanyConfigurationData, ConfigurationData } from './CompanyConfigurationData';

export class Company extends Aggregate {
  @Exclude() private id: UuidValueObject;
  @Exclude() public administrativeData: CompanyAdministrativeData;
  @Exclude() public configurationData: CompanyConfigurationData;

  public socialReason: string;
  public serialNumber: string;
  public fantasyName: string;
  public email: string;
  public description: string;
  public address: string;
  public foundationDate: string;
  public objective: string;
  public imageUrl: string;

  constructor(data: JsonDocument<Company>) {
    super();
    this.id = data._id ? new UuidValueObject(data._id as string) : UuidValueObject.random();
    this.socialReason = data.socialReason;
    this.serialNumber = data.serialNumber;
    this.fantasyName = data.fantasyName;
    this.email = data.email;
    this.description = data.description;
    this.address = data.address;
    this.foundationDate = data.foundationDate;
    this.objective = data.objective;
    this.imageUrl = data.imageUrl;
    this.administrativeData = new CompanyAdministrativeData(data.administrativeData.category, data.administrativeData.plan);
    this.configurationData = new CompanyConfigurationData(data.configurationData.timezone, data.configurationData.lang);
  }

  @Expose({ name: '_id' })
  public get _id(): string {
    return this.id.getValue();
  }

  @Expose({ name: 'administrativeData' })
  public get administrative(): AdministrativeData {
    return this.administrativeData.getValue();
  }

  @Expose({ name: 'configurationData' })
  public get configuration(): ConfigurationData {
    return this.configurationData.getValue();
  }

  public toPrimitives<Company>(context?: string): JsonDocument<Company> {
    return <JsonDocument<Company>>instanceToPlain(this, { groups: [context] });
  }
}
