/* eslint-disable @typescript-eslint/no-var-requires */
import { Aggregate, Email, GeoPoint, Nullable, Photo, Primitives } from '@ducen/shared';
import { Exclude, Expose, instanceToPlain } from 'class-transformer';
import { Company } from '../../company/domain/classes/entities/Company';
import { Profile } from '../../profile/domain/Profile';
import { Password } from './Password';
import { UserAddress } from './UserAddress';
import { UserBirthDate } from './UserBirthDate';
import { UserConfiguration, UserConfigurationData } from './UserConfigurationData';
const jwt = require('jsonwebtoken');

export class User extends Aggregate {
  @Exclude() configurationData: UserConfigurationData;
  @Exclude() password: Password;
  @Exclude() email: Email;
  @Exclude() birthDate: UserBirthDate;
  @Exclude() address: UserAddress;
  @Exclude() geo: GeoPoint;
  @Exclude() photo: Photo;

  public profile: string | Profile;
  public company: string | Company;
  username: string;
  firstName: string;
  lastName: string;
  biography?: string;
  sex?: string;

  constructor(data: Primitives<User>) {
    super(data);

    this.username = data.username;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.biography = data.biography;
    this.sex = data.sex;

    this.configurationData = new UserConfigurationData(data.configurationData);
    this.password = new Password(data.password);
    this.email = new Email(data.email);
    this.birthDate = new UserBirthDate(data.birthDate);
    this.address = new UserAddress(data.address);
    this.photo = new Photo(data.photo);
    this.geo = new GeoPoint(data.geo);

    this.profile = typeof data.profile === 'string' || [null, undefined].includes(data.profile) ? data.profile : new Profile(data.profile as any);
    this.company = typeof data.company === 'string' || [null, undefined].includes(data.company) ? data.company : new Company(data.company as any);
  }

  public get myProfile(): Nullable<Profile> {
    return typeof this.profile === 'string' ? null : (this.profile as Profile);
  }

  @Expose({ name: 'age', groups: ['show'] })
  public get age(): number {
    return this.birthDate.calculateAge();
  }

  @Expose({ name: 'password', groups: ['save'] })
  public get pass(): string {
    return this.password.getValue();
  }

  @Expose({ name: 'birthDate', groups: ['save'] })
  public get birthUTC(): Date {
    return this.birthDate.toUTC(this.configuration.timezone);
  }

  @Expose({ name: 'birthDate', groups: ['show'] })
  public get birthTZ(): Date {
    return this.birthDate.toTimeZone(this.configuration.timezone);
  }

  @Expose({ name: 'email' })
  public get mail(): string {
    return this.email.getValue();
  }

  @Expose({ name: 'photo' })
  public get image(): string {
    return this.photo.getValue();
  }

  @Expose({ name: 'configurationData' })
  public get configuration(): UserConfiguration {
    return this.configurationData.getValue();
  }

  @Expose({ name: 'address' })
  public get residence(): any {
    return this.address.getValue();
  }

  @Expose({ name: 'geo' })
  public get point(): any {
    return this.geo.getValue();
  }

  public toPrimitives<User>(context?: string): Primitives<User> {
    return <Primitives<User>>instanceToPlain(this, { groups: [context] });
  }

  public generateToken(key: string): string {
    const payload = {
      _id: this._id,
      administrativeData: this.configuration,
      profile: this.myProfile.toPrimitives('show'),
    };

    const token = jwt.sign(payload, key, { expiresIn: 60 * 60 * 24 });
    return token;
  }

  public static authenticate(token: string, key: string): any {
    const payload = jwt.verify(token, key);
    return payload;
  }
}
