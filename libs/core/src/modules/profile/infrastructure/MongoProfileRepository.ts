import { MongoRepository } from '@ducen/adaptors';
import { Policy } from '../domain/Policy';
import { Profile } from '../domain/Profile';
import { ProfileRepository } from '../domain/ProfileRepository';

export class MongoProfileRepository extends MongoRepository<Profile> implements ProfileRepository {
  async addPolicy(id: string, policy: Policy): Promise<void> {
    await this.collection.updateOne({ _id: id }, { policies: { actions: policy.value.actions, entity: policy.value.entity } });
  }
}
