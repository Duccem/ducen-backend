import { User } from '@ducen/core';
import { JsonDocument } from '@ducen/shared';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>('auth.googleClientID'),
      clientSecret: configService.get<string>('auth.googleClientSecret'),
      callbackURL: 'http://localhost:3000/auth/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback): Promise<any> {
    const { emails, name, photos, id } = profile;
    const user: JsonDocument<User> = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      sex: 'N/D',
      username: emails[0].value,
      birthDate: new Date().toISOString(),
      photo: photos[0].value,
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
        lang: 'en',
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
