import { Device, DeviceRepository, DeviceType, ErrorTypes, GeneralError, GeneralResponse, ResponseDecorator, ResponseTypes } from '@ducen/adaptors';
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
    @Inject('DEVICE_REPOSITORY')
    private deviceRepository: DeviceRepository,
  ) {}

  async login(identifier: string, password: string) {
    const user = await this.userRepository.getOneByIdentifier(identifier);
    console.log(user);
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
    await this.userRepository.persist(user._id, user);

    return new GeneralResponse(ResponseTypes.CREATED, {
      data: {
        user: user.toPrimitives('show'),
        token: user.generateToken(this.authKey),
      },
    });
  }

  async externalSign(userData: JsonDocument<User>) {
    const user = new User(userData);
    const existingUser = await this.userRepository.getOneByIdentifier(user.mail);
    if (existingUser)
      return new GeneralResponse(ResponseTypes.FOUNDED, {
        data: { user: existingUser.toPrimitives('show'), token: existingUser.generateToken(this.authKey) },
      });

    user.password.encrypt();
    await this.userRepository.persist(user._id, user);

    return new GeneralResponse(ResponseTypes.CREATED, {
      data: {
        user: user.toPrimitives('show'),
        token: user.generateToken(this.authKey),
      },
    });
  }

  @ResponseDecorator(ResponseTypes.CREATED)
  async registerToken(userId: string, token: string) {
    const user = await this.userRepository.get(userId);
    if (!user) throw new GeneralError(ErrorTypes.NOT_FOUND);

    const devices = await this.deviceRepository.getByUser(userId);

    const found = devices.find((device) => device.token === token);
    if (found) return null;

    const device = new Device({
      token,
      type: DeviceType.WEB,
      user: userId,
    });

    await this.deviceRepository.persist(device._id, device);

    return device;
  }
}
