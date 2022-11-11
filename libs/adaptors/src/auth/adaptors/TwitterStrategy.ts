import { User } from '@ducen/core';
import { Primitives } from '@ducen/shared';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-twitter';

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {
  constructor(configService: ConfigService) {
    super({
      consumerKey: configService.get<string>('auth.twitterClientID'),
      consumerSecret: configService.get<string>('auth.twitterClientSecret'),
      oauth_callback: 'http://localhost:3000/auth/twitter/redirect',
      userProfileURL: 'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true&skip_status=true',
    });
  }
  async validate(accessToken: string, tokenSecret: string, profile: Profile, cb: (err: any, user: any) => void) {
    const { emails, displayName, photos, id, _json } = profile;
    const user: Primitives<User> = {
      email: emails[0].value,
      firstName: displayName.split(' ')[0],
      lastName: displayName.split(' ')[1],
      sex: 'N/D',
      username: emails[0].value,
      birthDate: new Date().toISOString(),
      photo: photos[0].value,
      password: id,
      biography: _json.description,
      address: {
        city: '',
        country: '',
        direction: _json.location,
        coordinates: {
          latitude: 0,
          longitude: 0,
        },
      },
      configurationData: {
        lang: _json.lang || 'en',
        theme: 'Light',
        timezone: 'america/new_york',
      },
    };
    const payload = {
      user,
      accessToken,
    };

    cb(null, payload);
  }
}
