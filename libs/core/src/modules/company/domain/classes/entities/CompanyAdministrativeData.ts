import { CompoundValueObject, Primitives } from '@ducen/shared';

export interface AdministrativeData {
  category: string;
  plan: string;
}

export class CompanyAdministrativeData extends CompoundValueObject<AdministrativeData> {
  constructor({ category, plan }: Primitives<AdministrativeData>) {
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
