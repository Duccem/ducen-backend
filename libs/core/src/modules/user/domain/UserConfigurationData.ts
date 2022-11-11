import { CompoundValueObject } from '@ducen/shared';

export interface UserConfiguration {
  timezone: string;
  lang: string;
  theme: string;
}

export class UserConfigurationData extends CompoundValueObject<UserConfiguration> {
  constructor({ timezone, lang, theme }: { timezone: string; lang: string; theme: string }) {
    super({
      timezone,
      lang,
      theme,
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
