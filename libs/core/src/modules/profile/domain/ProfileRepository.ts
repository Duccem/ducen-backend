import { Repository } from '@ducen/adaptors';
import { Policy } from './Policy';
import { Profile } from './Profile';

export interface ProfileRepository extends Repository<Profile> {
  addPolicy(id: string, policy: Policy): Promise<void>;
}
