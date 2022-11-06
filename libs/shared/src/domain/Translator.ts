import { Injectable } from '@nestjs/common';
import { I18n } from 'i18n';
import { join } from 'path';
@Injectable()
export class Translator {
  private i18n: I18n;
  constructor() {
    this.i18n = new I18n({
      locales: ['es', 'en'],
      defaultLocale: 'es',
      directory: join(process.cwd(), 'apps/main-api/src/locales'),
    });
  }
  translate(key: string, data = {}): string {
    return this.i18n.__(key, data).trim();
  }

  setLocale(locale: string) {
    this.i18n.setLocale(locale);
  }
}
