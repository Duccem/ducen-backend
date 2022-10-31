import { ProfileSubscriber } from '@ducen/core/modules/profile/services/ProfileSubscriber';
import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '../../domain/EventBus';

@Injectable()
export class InMemoryObserversRegister {
  constructor(@Inject('MESSAGE_QUEUE') private eventBus: EventBus, @Inject(ProfileSubscriber) private profileSubscriber: ProfileSubscriber) {
    this.eventBus.addSubscribers([this.profileSubscriber]);
  }
}
