import { CompoundValueObject } from '@ducen/shared';

export interface UserConfiguration {
  timezone: string;
  lang: string;
  theme: string;
}

export class UserConfigurationData extends CompoundValueObject<UserConfiguration> {
  constructor(tz: string, lang: string, theme: string) {
    super({
      timezone: tz,
      lang: lang,
      theme: theme,
    });
  }

  public getValue(): UserConfiguration {
    return {
      theme: this.value.theme,
      timezone: this.value.timezone,
      lang: this.value.lang,
    };
  }
}
