import { ErrorTypes, EventBus, GeneralError, GetCacheData, ResponseDecorator, ResponseTypes } from '@ducen/adaptors';
import { JsonDocument } from '@ducen/shared';
import { Inject, Injectable } from '@nestjs/common';
import { Profile } from '../domain/Profile';
import { ProfileCreatedDomainEvent } from '../domain/ProfileCreatedDomainEvent';
import { ProfileRepository } from '../domain/ProfileRepository';
@Injectable()
export class ProfileService {
  constructor(@Inject('PROFILE_REPOSITORY') private profileRepository: ProfileRepository, @Inject('MESSAGE_QUEUE') private eventBus: EventBus) {}

  @ResponseDecorator(ResponseTypes.LISTED)
  @GetCacheData(Profile)
  async getProfiles(cacheData?: Profile[], cacheCount?: number) {
    if (cacheData && cacheCount) {
      return { data: cacheData, count: cacheCount };
    }
    const [profiles, count] = await Promise.all([this.profileRepository.list(50, 0), this.profileRepository.count()]);
    return { data: profiles, count };
  }

  @ResponseDecorator(ResponseTypes.FOUNDED)
  @GetCacheData(Profile)
  async getProfile(id: string, cachedData?: Profile) {
    if (cachedData) cachedData;
    const profile = await this.profileRepository.get(id);
    if (!profile) throw new GeneralError(ErrorTypes.NOT_FOUND, 'Profile not found');
    return profile;
  }

  @ResponseDecorator(ResponseTypes.CREATED)
  async createProfile(data: JsonDocument<Profile>) {
    const profile = new Profile(data);

    const exist = await this.profileRepository.exist(profile._id);

    if (exist) throw new GeneralError(ErrorTypes.BAD_REQUEST, 'The profile already exist');

    const profileCreatedEvent = new ProfileCreatedDomainEvent({
      aggregateId: profile._id,
      name: profile.name,
      entities: profile.policies.map((policy) => policy.value.entity),
    });

    await this.profileRepository.insert(profile);

    profile.record(profileCreatedEvent);

    await this.eventBus.publish(profile.pullDomainEvents());

    return profile;
  }

  @ResponseDecorator(ResponseTypes.UPDATED)
  async updateProfile(id: string, data: JsonDocument<Profile>) {
    const exist = await this.profileRepository.exist(id);
    if (!exist) throw new GeneralError(ErrorTypes.NOT_FOUND, 'Profile not found');

    await this.profileRepository.update(id, data);

    const profile = await this.profileRepository.get(id);

    return profile;
  }

  @ResponseDecorator(ResponseTypes.DELETED)
  async deleteProfile(id: string) {
    const exist = await this.profileRepository.exist(id);
    if (!exist) throw new GeneralError(ErrorTypes.NOT_FOUND, 'Profile not found');

    await this.profileRepository.delete(id);

    return null;
  }
}
