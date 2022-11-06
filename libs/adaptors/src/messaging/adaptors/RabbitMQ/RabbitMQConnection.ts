import { ConfirmChannel, ConsumeMessage } from 'amqplib';
import { RabbitMQFormatter } from './RabbitMQFormatter';

export class RabbitMQConnection {
  private channel?: ConfirmChannel;
  constructor(channel: ConfirmChannel) {
    this.channel = channel;
  }

  async exchange(name: string) {
    return await this.channel.assertExchange(name, 'topic', { durable: true });
  }

  async queue(exchange: string, name: string, routingKeys: string[], dlExchange?: string, dlQueue?: string, messageTtl?: number) {
    const args = RabbitMQFormatter.formatQueueArguments({
      deadLetterExchange: dlExchange,
      deadLetterQueue: dlQueue,
      messageTtl,
    });
    await this.channel.assertQueue(name, {
      exclusive: false,
      durable: true,
      autoDelete: false,
      arguments: args,
    });

    for (const routingKey of routingKeys) {
      await this.channel.bindQueue(name, exchange, routingKey);
    }
  }

  async publish(exchange: string, routingKey: string, content: Buffer, options: any) {
    return new Promise<void>((resolve, reject) => {
      this.channel.publish(exchange, routingKey, content, options, (error) => (error ? reject(error) : resolve()));
    });
  }

  async consume(queue: string, onMessage: (message: ConsumeMessage) => void) {
    await this.channel.consume(queue, (message: ConsumeMessage | null) => {
      if (!message) {
        return;
      }
      onMessage(message);
    });
  }

  async ack(message: ConsumeMessage) {
    this.channel.ack(message);
  }

  async retry(message: ConsumeMessage, queue: string, exchange: string) {
    const retryExchange = RabbitMQFormatter.formatExchangeRetryName(exchange);
    const options = this.getMessageOptions(message);

    return await this.publish(retryExchange, queue, message.content, options);
  }

  async deadLetter(message: ConsumeMessage, queue: string, exchange: string) {
    const deadLetterExchange = RabbitMQFormatter.formatExchangeDeadLetterName(exchange);
    const options = this.getMessageOptions(message);

    return await this.publish(deadLetterExchange, queue, message.content, options);
  }

  private getMessageOptions(message: ConsumeMessage) {
    const { messageId, contentType, contentEncoding, priority } = message.properties;
    const options = {
      messageId,
      headers: this.incrementRedeliveryCount(message),
      contentType,
      contentEncoding,
      priority,
    };
    return options;
  }

  private incrementRedeliveryCount(message: ConsumeMessage) {
    if (this.hasBeenRedelivered(message)) {
      const count = parseInt(message.properties.headers['redelivery_count']);
      message.properties.headers['redelivery_count'] = count + 1;
    } else {
      message.properties.headers['redelivery_count'] = 1;
    }

    return message.properties.headers;
  }

  private hasBeenRedelivered(message: ConsumeMessage) {
    return message.properties.headers['redelivery_count'] !== undefined;
  }
}
