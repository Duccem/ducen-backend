import { DateValueObject } from '@ducen/shared';

export class UserBirthDate extends DateValueObject {
  public calculateAge(): number {
    const today = new Date();
    let age = today.getFullYear() - this.value.getFullYear();
    const month = today.getMonth() - this.value.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < this.value.getDate())) {
      age--;
    }

    return age;
  }

  public isBirthDay(): boolean {
    const today = new Date();
    if (today.getDate() == this.value.getDate()) return true;
    return false;
  }
}
