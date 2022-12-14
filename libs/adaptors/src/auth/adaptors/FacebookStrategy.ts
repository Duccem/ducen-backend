import { User } from '@ducen/core';
import { Primitives } from '@ducen/shared';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>('auth.facebookClientID'),
      clientSecret: configService.get<string>('auth.facebookClientSecret'),
      callbackURL: 'http://localhost:3000/auth/facebook/redirect',
      scope: 'email',
      profileFields: ['email', 'name', 'gender', 'birthday', 'picture', 'hometown'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done: (err: any, user: any, info?: any) => void): Promise<any> {
    const { emails, name, photos, id } = profile;
    const user: Primitives<User> = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      sex: 'N/D',
      username: emails[0].value,
      birthDate: new Date(),
      photo: photos[0].value,
      password: id,
      biography: '',
      address: {
        city: '',
        country: '',
        direction: '',
        postal: '',
      },
      geo: {
        latitude: 0,
        longitude: 0,
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
