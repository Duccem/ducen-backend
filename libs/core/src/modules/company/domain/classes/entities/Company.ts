import { Aggregate, Primitives } from '@ducen/shared';
import { Exclude, Expose, instanceToPlain } from 'class-transformer';
import { AdministrativeData, CompanyAdministrativeData } from './CompanyAdministrativeData';
import { CompanyConfigurationData, ConfigurationData } from './CompanyConfigurationData';

export class Company extends Aggregate {
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

  constructor(data: Primitives<Company>) {
    super(data);
    this.socialReason = data.socialReason;
    this.serialNumber = data.serialNumber;
    this.fantasyName = data.fantasyName;
    this.email = data.email;
    this.description = data.description;
    this.address = data.address;
    this.foundationDate = data.foundationDate;
    this.objective = data.objective;
    this.imageUrl = data.imageUrl;
    this.administrativeData = new CompanyAdministrativeData(data.administrativeData);
    this.configurationData = new CompanyConfigurationData(data.configurationData);
  }

  @Expose({ name: 'administrativeData' })
  public get administrative(): AdministrativeData {
    return this.administrativeData.getValue();
  }

  @Expose({ name: 'configurationData' })
  public get configuration(): ConfigurationData {
    return this.configurationData.getValue();
  }

  public toPrimitives<Company>(context?: string): Primitives<Company> {
    return <Primitives<Company>>instanceToPlain(this, { groups: [context] });
  }
}
