import { DomainEvent } from '../../domain/DomainEvent';
import { DomainEventSerializer } from '../../domain/DomainEventSerializer';
import { DomainEventSubscriber } from '../../domain/DomainEventSubscriber';

export class RabbitMQFormatter {
  static formatQueueArguments(params: { deadLetterExchange?: string; deadLetterQueue?: string; messageTtl?: number }) {
    let args: any = {};
    if (params.deadLetterExchange) {
      args = { ...args, 'x-dead-letter-exchange': params.deadLetterExchange };
    }
    if (params.deadLetterQueue) {
      args = { ...args, 'x-dead-letter-routing-key': params.deadLetterQueue };
    }
    if (params.messageTtl) {
      args = { ...args, 'x-message-ttl': params.messageTtl };
    }

    return args;
  }

  static formatExchangeRetryName(exchange: string): string {
    return `retry_${exchange}`;
  }

  static formatExchangeDeadLetterName(exchange: string): string {
    return `dead_letter_${exchange}`;
  }

  static formatQueue(subscriber: DomainEventSubscriber) {
    const value = subscriber.constructor.name;
    const name = value
      .split(/(?=[A-Z])/)
      .join('_')
      .toLowerCase();
    return `test.${name}`;
  }

  static formatQueueRetry(subscriber: DomainEventSubscriber) {
    const name = this.formatQueue(subscriber);
    return `retry.${name}`;
  }

  static formatQueueDeadLetter(subscriber: DomainEventSubscriber) {
    const name = this.formatQueue(subscriber);
    return `dead_letter.${name}`;
  }

  static eventOptions(event: DomainEvent) {
    return {
      messageId: event.eventId,
      contentType: 'application/json',
      contentEncoding: 'utf-8',
    };
  }

  static toBuffer(event: DomainEvent): Buffer {
    const eventPrimitives = DomainEventSerializer.serialize(event);

    return Buffer.from(eventPrimitives);
  }

  static getRoutingKeysFor(subscriber: DomainEventSubscriber) {
    const routingKeys = subscriber.subscribedTo().map((event) => event.EVENT_NAME);

    const queue = this.formatQueue(subscriber);
    routingKeys.push(queue);

    return routingKeys;
  }
}
