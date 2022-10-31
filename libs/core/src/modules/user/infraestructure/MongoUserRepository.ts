import { MongoRepository } from '@ducen/adaptors';
import { Nullable } from '@ducen/shared';
import { User } from '../domain/User';
import { UserRepository } from '../domain/UserRepository';
import { login, profile } from './MongoAggregates';

export class MongoUserRepository extends MongoRepository<User> implements UserRepository {
  async getOneByIdentifier(identifier: string): Promise<Nullable<User>> {
    const user = await this.collection.aggregate([...login(identifier), ...profile]).toArray();
    if (user.length <= 0) return null;
    return new User(user.shift());
  }
}
