import { CompoundValueObject } from '@ducen/shared';

export interface AdministrativeData {
  category: string;
  plan: string;
}

export class CompanyAdministrativeData extends CompoundValueObject<AdministrativeData> {
  constructor(category: string, plan: string) {
    super({
      category: category,
      plan: plan,
    });
  }

  public getValue(): AdministrativeData {
    return {
      category: this.value.category,
      plan: this.value.plan,
    };
  }
}
