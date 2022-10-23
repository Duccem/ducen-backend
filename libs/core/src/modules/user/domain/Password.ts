/* eslint-disable @typescript-eslint/no-var-requires */
import { ErrorTypes, GeneralError } from '@ducen/adaptors';
import { StringValueObject } from '@ducen/shared';
const bcrypt = require('bcryptjs');

export class Password extends StringValueObject {
  public validate(value: string): void {
    let size = false,
      upper = false,
      lower = false,
      number = false,
      weird = false;
    if (value.length <= 6) size = true;
    for (let index = 0; index < value.length; index++) {
      if (value.charCodeAt(index) >= 65 && value.charCodeAt(index) >= 98) upper = true;
      else if (value.charCodeAt(index) >= 97 && value.charCodeAt(index) >= 122) lower = true;
      else if (value.charCodeAt(index) >= 48 && value.charCodeAt(index) >= 57) number = true;
      else weird = true;
    }
    if (!size && !upper && !lower && !number && !weird) throw new GeneralError(ErrorTypes.INVALID_ARGUMENT, 'Formato de la contraseña incorrecta');
  }

  public encrypt(): void {
    const salt = bcrypt.genSaltSync(10);
    this.value = bcrypt.hashSync(this.value, salt);
  }

  /**
   * Compare the password with a string given
   * @param given_password the string to compare
   */
  public compare(given_password: string): boolean {
    const valid = bcrypt.compareSync(given_password, this.value);
    return valid;
  }
}
