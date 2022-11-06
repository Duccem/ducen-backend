import { DomainEvent } from '@ducen/shared';
import { Inject } from '@nestjs/common';
import EventEmitter from 'events';
import { DomainEventDeserializer } from '../../domain/DomainEventDeserializer';
import { DomainEventSerializer } from '../../domain/DomainEventSerializer';
import { DomainEventSubscriber } from '../../domain/DomainEventSubscriber';
import { EventBus } from '../../domain/EventBus';
import { DomainEventFailOverPublisher } from '../DomainEventFailOverPublisher';

export class InMemoryEventBus implements EventBus {
  private channel: EventEmitter;
  private deserializer: DomainEventDeserializer;
  constructor(@Inject(DomainEventFailOverPublisher) private failOverPublisher: DomainEventFailOverPublisher) {
    this.channel = new EventEmitter();
  }

  async configure(subscribers: DomainEventSubscriber[]): Promise<void> {
    subscribers.map((sub) => console.log(sub.constructor.name));
  }

  async publish(events: DomainEvent[]): Promise<void> {
    for (const event of events) {
      try {
        this.channel.emit(event.eventName, DomainEventSerializer.serialize(event));
      } catch (error) {
        await this.failOverPublisher.publish(event);
      }
    }
  }

  addSubscribers(subscribers: DomainEventSubscriber[]): void {
    if (!subscribers) return;
    this.deserializer = DomainEventDeserializer.configure(subscribers);
    this.failOverPublisher.setDeserializer(this.deserializer);
    subscribers.map((subscriber) => this.registerSubscriber(subscriber));
  }

  public registerSubscriber(subscriber: DomainEventSubscriber) {
    subscriber.subscribedTo().map((event) => {
      this.channel.on(event.EVENT_NAME, (msg: string) => {
        subscriber.on(this.deserializer.deserialize(msg));
      });
    });
  }
}
