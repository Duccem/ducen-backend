import { User } from '@ducen/core';
import { JsonDocument } from '@ducen/shared';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>('auth.githubClientID'),
      clientSecret: configService.get<string>('auth.githubClientSecret'),
      callbackURL: 'http://localhost:3000/auth/github/redirect',
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: (err: any, user: any) => void): Promise<any> {
    const { emails, displayName, photos, id, _json } = profile;
    const user: JsonDocument<User> = {
      email: emails[0].value,
      firstName: displayName.split(' ')[0],
      lastName: displayName.split(' ')[1],
      sex: 'N/D',
      username: emails[0].value,
      birthDate: new Date().toISOString(),
      photo: photos[0].value,
      password: id,
      biography: _json.bio,
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
