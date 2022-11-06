import { Translator } from '@ducen/shared/domain/Translator';

describe('Translator', () => {
  let translator: Translator;

  beforeAll(() => {
    translator = new Translator();
  });

  it('should translate the greeting alone', () => {
    expect(translator.translate('greeting')).toBe('Hola');
  });

  it('should translate the greeting with a name', () => {
    expect(translator.translate('greeting', { name: 'Jose' })).toBe('Hola Jose');
  });

  it('should change the locale', () => {
    translator.setLocale('en');
    expect(translator.translate('greeting')).toBe('Hi');
  });
});
