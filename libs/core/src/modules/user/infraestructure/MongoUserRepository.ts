import { MongoRepository } from '@ducen/adaptors';
import { Nullable } from '@ducen/shared';
import { User } from '../domain/User';
import { UserRepository } from '../domain/UserRepository';

export class MongoUserRepository extends MongoRepository<User> implements UserRepository {
  async getOneByIdentifier(identifier: string): Promise<Nullable<User>> {
    const user = await this.collection.findOne({ $or: [{ username: identifier }, { email: identifier }] });
    if (!user) return null;
    return new User(user);
  }
}
