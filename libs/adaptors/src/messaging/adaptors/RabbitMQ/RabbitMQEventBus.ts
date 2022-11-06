import { DomainEvent } from '../../domain/DomainEvent';
import { DomainEventDeserializer } from '../../domain/DomainEventDeserializer';
import { DomainEventSubscriber } from '../../domain/DomainEventSubscriber';
import { EventBus } from '../../domain/EventBus';
import { DomainEventFailOverPublisher } from '../DomainEventFailOverPublisher';
import { RabbitMQConnection } from './RabbitMQConnection';
import { RabbitMQConsumer } from './RabbitMQConsumer';
import { RabbitMQFormatter } from './RabbitMQFormatter';

export class RabbitMQEventBus implements EventBus {
  private deserializer: DomainEventDeserializer;
  private exchange = 'ducen_events';
  constructor(private failOverPublisher: DomainEventFailOverPublisher, private connection: RabbitMQConnection) {}

  async configure(subscribers: Array<DomainEventSubscriber>): Promise<void> {
    const retryExchange = RabbitMQFormatter.formatExchangeRetryName(this.exchange);
    const deadLetterExchange = RabbitMQFormatter.formatExchangeDeadLetterName(this.exchange);
    await this.connection.exchange(this.exchange);
    await this.connection.exchange(retryExchange);
    await this.connection.exchange(deadLetterExchange);
    for (const subscriber of subscribers) {
      await this.addQueue(subscriber, this.exchange);
    }
  }

  private async addQueue(subscriber: DomainEventSubscriber, exchange: string) {
    const retryExchange = RabbitMQFormatter.formatExchangeRetryName(exchange);
    const deadLetterExchange = RabbitMQFormatter.formatExchangeDeadLetterName(exchange);

    const routingKeys = RabbitMQFormatter.getRoutingKeysFor(subscriber);

    const queue = RabbitMQFormatter.formatQueue(subscriber);
    const deadLetterQueue = RabbitMQFormatter.formatQueueDeadLetter(subscriber);
    const retryQueue = RabbitMQFormatter.formatQueueRetry(subscriber);

    await this.connection.queue(exchange, queue, routingKeys);
    await this.connection.queue(retryExchange, retryQueue, [queue], exchange, queue, 1000);
    await this.connection.queue(deadLetterExchange, deadLetterQueue, [queue]);
  }

  async addSubscribers(subscribers: DomainEventSubscriber[]): Promise<void> {
    await this.configure(subscribers);
    this.deserializer = DomainEventDeserializer.configure(subscribers);
    for (const subscriber of subscribers) {
      const queueName = RabbitMQFormatter.formatQueue(subscriber);
      const consumer = new RabbitMQConsumer(subscriber, this.connection, this.deserializer, queueName, this.exchange, 1000);
      await this.connection.consume(queueName, consumer.onMessage.bind(consumer));
    }
  }

  async publish(events: DomainEvent[]): Promise<void> {
    for (const event of events) {
      try {
        const routingKey = event.eventName;
        const content = RabbitMQFormatter.toBuffer(event);
        const options = RabbitMQFormatter.eventOptions(event);

        await this.connection.publish(this.exchange, routingKey, content, options);
      } catch (error: any) {
        await this.failOverPublisher.publish(event);
      }
    }
  }
}
