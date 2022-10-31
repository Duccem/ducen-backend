import { ErrorTypes, GeneralError, GeneralResponse, ResponseTypes } from '@ducen/adaptors';
import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../domain/UserRepository';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: UserRepository,
  ) {}

  async getUser(id: string): Promise<GeneralResponse> {
    const user = await this.userRepository.get(id);
    if (!user) throw new GeneralError(ErrorTypes.NOT_FOUND, 'User not found');
    return new GeneralResponse(ResponseTypes.FOUNDED, { data: user.toPrimitives('show') });
  }
}
