import { ConsumeMessage } from 'amqplib';
import { DomainEventDeserializer } from '../../domain/DomainEventDeserializer';
import { DomainEventSubscriber } from '../../domain/DomainEventSubscriber';
import { RabbitMQConnection } from './RabbitMQConnection';

export class RabbitMQConsumer {
  private subscriber: DomainEventSubscriber;
  private deserializer: DomainEventDeserializer;
  private connection: RabbitMQConnection;
  private maxRetries: number;
  private queueName: string;
  private exchange: string;

  constructor(
    subscriber: DomainEventSubscriber,
    connection: RabbitMQConnection,
    deserializer: DomainEventDeserializer,
    queue: string,
    exchange: string,
    retries: number,
  ) {
    this.subscriber = subscriber;
    this.connection = connection;
    this.deserializer = deserializer;
    this.queueName = queue;
    this.exchange = exchange;
    this.maxRetries = retries;
  }

  async onMessage(message: ConsumeMessage) {
    const content = message.content.toString();
    const domainEvent = this.deserializer.deserialize(content);

    try {
      await this.subscriber.on(domainEvent);
    } catch (error) {
      await this.handleError(message);
    } finally {
      this.connection.ack(message);
    }
  }

  private async handleError(message: ConsumeMessage) {
    if (this.hasBeenRedeliveredTooMuch(message)) {
      await this.deadLetter(message);
    } else {
      await this.retry(message);
    }
  }

  private async retry(message: ConsumeMessage) {
    await this.connection.retry(message, this.queueName, this.exchange);
  }

  private async deadLetter(message: ConsumeMessage) {
    await this.connection.deadLetter(message, this.queueName, this.exchange);
  }

  private hasBeenRedeliveredTooMuch(message: ConsumeMessage) {
    if (this.hasBeenRedelivered(message)) {
      const count = parseInt(message.properties.headers['redelivery_count']);
      return count >= this.maxRetries;
    }
    return false;
  }

  private hasBeenRedelivered(message: ConsumeMessage) {
    return message.properties.headers['redelivery_count'] !== undefined;
  }
}
