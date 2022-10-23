import { Repository } from '@ducen/adaptors';
import { Nullable } from '@ducen/shared';
import { User } from './User';

export interface UserRepository extends Repository<User> {
  getOneByIdentifier(identifier: string): Promise<Nullable<User>>;
}
