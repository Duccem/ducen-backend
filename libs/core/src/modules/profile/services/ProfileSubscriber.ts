import { DomainEventSubscriber } from '@ducen/adaptors';
import { DomainEvent, DomainEventClass } from '@ducen/shared';
import { Injectable } from '@nestjs/common';
import { ProfileCreatedDomainEvent } from '../domain/ProfileCreatedDomainEvent';

@Injectable()
export class ProfileSubscriber implements DomainEventSubscriber {
  subscribedTo(): DomainEventClass[] {
    return [ProfileCreatedDomainEvent];
  }

  async on(domainEvent: DomainEvent): Promise<void> {
    console.log(domainEvent.toPrimitive());
  }
}
