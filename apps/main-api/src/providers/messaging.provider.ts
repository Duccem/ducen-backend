import { Logger, MongoConnection } from '@ducen/adaptors';
import { DomainEventFailOverPublisher } from '@ducen/adaptors/messaging/adaptors/DomainEventFailOverPublisher';
import { RabbitMQConnection } from '@ducen/adaptors/messaging/adaptors/RabbitMQ/RabbitMQConnection';
import { RabbitMQEventBus } from '@ducen/adaptors/messaging/adaptors/RabbitMQ/RabbitMQEventBus';
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { connect } from 'amqplib';

export const EventBusConnection: Provider = {
  provide: 'QUEUE_CONNECTION',
  inject: [ConfigService, 'MY_LOGGER'],
  useFactory: async (configService: ConfigService, logger: Logger) => {
    try {
      const connection = await connect({
        hostname: configService.get<string>('message.hostname'),
        protocol: configService.get<string>('message.protocol'),
        port: configService.get<number>('message.port'),
        username: configService.get<string>('message.username'),
        password: configService.get<string>('message.password'),
        vhost: configService.get<string>('message.vhost'),
      });
      const channel = await connection.createConfirmChannel();
      await channel.prefetch(1);
      return new RabbitMQConnection(channel);
    } catch (error) {
      logger.error('message q error: ' + error.message);
    }
  },
};

export const EventBusProvider: Provider = {
  provide: 'MESSAGE_QUEUE',
  inject: ['QUEUE_CONNECTION', 'DATABASE_CONNECTION', 'MY_LOGGER'],
  useFactory: (qConnection: RabbitMQConnection, dbConnection: MongoConnection, logger: Logger) => {
    try {
      const failoverPublisher = new DomainEventFailOverPublisher(dbConnection);
      return new RabbitMQEventBus(failoverPublisher, qConnection);
    } catch (error) {
      logger.error('Error on event bus creation');
    }
  },
};
