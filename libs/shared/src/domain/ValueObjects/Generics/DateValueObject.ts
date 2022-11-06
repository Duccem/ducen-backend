import { isValid } from 'date-fns';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';
import { PrimitiveValueObject } from '../Base/PrimitiveValueObject';

export class DateValueObject extends PrimitiveValueObject<Date> {
  constructor(value: string | Date) {
    super(new Date(value));
  }
  /**
   *
   * * Validate the format of the date
   */
  public validate(value: Date): void {
    if (!isValid(new Date(value))) throw new Error('The format of the date is not correct');
  }

  /**
   * * Convert a zoned date to an utc date to standardize the dates
   * @param tz
   * @returns Date utc hour
   */
  public toUTC(tz?: string): Date {
    return zonedTimeToUtc(<Date>this.value, tz || process.env.GLOBAL_TIMEZONE || '');
  }

  /**
   * * Convert an UTC date to zoned date for show it to the client
   * @param tz
   * @returns Date zoned hour
   */
  public toTimeZone(tz?: string): Date {
    return utcToZonedTime(<Date>this.value, tz || process.env.GLOBAL_TIMEZONE || '');
  }

  public getValue(): Date {
    return <Date>this.value;
  }
}
