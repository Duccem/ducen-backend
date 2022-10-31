import { DomainEvent } from '@ducen/shared';
import { EventEmitter } from 'events';
import { DomainEventSubscriber } from '../../domain/DomainEventSubscriber';

export class InMemoryEventEmitterBus {
  private channel: EventEmitter;
  constructor() {
    this.channel = new EventEmitter();
  }

  public registerSubscribers(subscribers?: DomainEventSubscriber[]) {
    if (!subscribers) return;
    subscribers.map((subscriber) => this.registerSubscriber(subscriber));
  }

  public registerSubscriber(subscriber: DomainEventSubscriber) {
    subscriber.subscribedTo().map((event) => {
      this.channel.on(event.EVENT_NAME, (msg: string) => {
        subscriber.on(event.fromPrimitives(JSON.parse(msg.toString() || '')));
      });
    });
  }

  public publish(events: DomainEvent[]) {
    events.map((event) => this.channel.emit(event.eventName, Buffer.from(JSON.stringify(event.toPrimitive()))));
  }
}
