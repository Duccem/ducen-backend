import { DomainEvent, DomainEventClass } from '@ducen/shared';

export interface DomainEventSubscriber {
  subscribedTo(): Array<DomainEventClass>;

  on(domainEvent: DomainEvent): Promise<void>;
}
