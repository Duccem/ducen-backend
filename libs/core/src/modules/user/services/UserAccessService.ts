import { ErrorTypes, GeneralError, GeneralResponse, ResponseTypes } from '@ducen/adaptors';
import { JsonDocument } from '@ducen/shared';
import { Inject, Injectable } from '@nestjs/common';
import { User } from '../domain/User';
import { UserRepository } from '../domain/UserRepository';

@Injectable()
export class UserAccessService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: UserRepository,
    @Inject('AUTH_KEY') private authKey: string,
  ) {}

  async login(identifier: string, password: string) {
    const user = await this.userRepository.getOneByIdentifier(identifier);
    if (!user) throw new GeneralError(ErrorTypes.UNAUTHORIZED, 'Authenticate error');

    const validUser = user.password.compare(password);

    if (!validUser) throw new GeneralError(ErrorTypes.UNAUTHORIZED, 'Authenticate error');

    return new GeneralResponse(ResponseTypes.SUCCESS, {
      data: {
        user: user.toPrimitives('show'),
        token: user.generateToken(this.authKey),
      },
    });
  }

  async signUp(userData: JsonDocument<User>) {
    const user = new User(userData);
    const [existUserByUsername, existUserByEmail] = await Promise.all([
      this.userRepository.getOneByIdentifier(user.username),
      this.userRepository.getOneByIdentifier(user.mail),
    ]);

    if (existUserByUsername || existUserByEmail) throw new GeneralError(ErrorTypes.BAD_REQUEST, 'The user already exist');

    user.password.encrypt();
    await this.userRepository.insert(user);

    return new GeneralResponse(ResponseTypes.CREATED, {
      data: {
        user: user.toPrimitives('show'),
        token: user.generateToken(this.authKey),
      },
    });
  }
}
