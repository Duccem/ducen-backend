import { DomainEvent, DomainEventClass, DomainEventSubscriber } from '@ducen/adaptors';
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
