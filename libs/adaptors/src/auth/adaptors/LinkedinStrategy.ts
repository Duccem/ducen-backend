import { User } from '@ducen/core';
import { Primitives } from '@ducen/shared';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-linkedin-oauth2';

@Injectable()
export class LinkedinStrategy extends PassportStrategy(Strategy, 'linkedin') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>('auth.linkedinClientID'),
      clientSecret: configService.get<string>('auth.linkedinClientSecret'),
      callbackURL: 'http://localhost:3000/auth/linkedin/redirect',
      scope: ['r_emailaddress', 'r_liteprofile'],
    });
  }
  async validate(accessToken: string, refreshToken: string, profile: Profile, done: (err: any, user: any) => void): Promise<any> {
    const { name, photos, id, _json } = profile;
    const user: Primitives<User> = {
      email: _json.emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      sex: 'N/D',
      username: _json.emails[0].value,
      birthDate: new Date().toISOString(),
      photo: photos[photos.length - 1].value,
      password: id,
      biography: '',
      address: {
        city: '',
        country: '',
        direction: '',
        coordinates: {
          latitude: 0,
          longitude: 0,
        },
      },
      configurationData: {
        lang: _json.firstName.preferredLocale.language,
        theme: 'Light',
        timezone: 'america/new_york',
      },
    };
    const payload = {
      user,
      accessToken,
    };

    done(null, payload);
  }
}
