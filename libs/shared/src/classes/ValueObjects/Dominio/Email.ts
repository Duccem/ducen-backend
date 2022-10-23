import { ErrorTypes, GeneralError } from '@ducen/adaptors';
import { StringValueObject } from '../Generics/StringValueObject';

export class Email extends StringValueObject {
  public validate(value: string): void {
    const rex = new RegExp(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
    if (rex.test(value)) return;
    else throw new GeneralError(ErrorTypes.INVALID_ARGUMENT, 'El email no tiene el formato correcto');
  }
}
