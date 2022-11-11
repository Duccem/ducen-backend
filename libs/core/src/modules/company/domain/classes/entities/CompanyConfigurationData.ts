import { CompoundValueObject, Primitives } from '@ducen/shared';

export interface ConfigurationData {
  timezone: string;
  lang: string;
}

export class CompanyConfigurationData extends CompoundValueObject<ConfigurationData> {
  constructor({ lang, timezone }: Primitives<ConfigurationData>) {
    super({
      timezone: timezone,
      lang: lang,
    });
  }

  public getValue(): ConfigurationData {
    return {
      timezone: this.value.timezone,
      lang: this.value.lang,
    };
  }
}
