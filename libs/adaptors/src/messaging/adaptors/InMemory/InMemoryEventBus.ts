import { DomainEvent } from '@ducen/shared';
import { DomainEventSubscriber } from '../../domain/DomainEventSubscriber';
import { EventBus } from '../../domain/EventBus';
import { InMemoryEventEmitterBus } from './InMemoryEventEmitterBus';

export class InMemoryEventBus implements EventBus {
  private bus: InMemoryEventEmitterBus;
  constructor() {
    this.bus = new InMemoryEventEmitterBus();
  }

  async publish(events: DomainEvent[]): Promise<void> {
    this.bus.publish(events);
  }

  addSubscribers(subscribers: DomainEventSubscriber[]): void {
    this.bus.registerSubscribers(subscribers);
  }
}
