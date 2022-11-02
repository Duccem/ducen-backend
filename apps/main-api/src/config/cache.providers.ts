import { RedisConnection, RedisStore } from '@ducen/adaptors';
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from 'redis';

export const store: Provider = {
  provide: 'CACHE_STORE',
  inject: ['CACHE_CONNECTION'],
  useFactory: (connection: RedisConnection) => new RedisStore(connection),
};

export const redisConnection: Provider = {
  provide: 'CACHE_CONNECTION',
  inject: [ConfigService],
  useFactory: async (configService: ConfigService): Promise<RedisConnection> => {
    try {
      let client;
      if (configService.get('db.cacheUri')) {
        client = createClient({ url: configService.get('db.cacheUri') });
      } else {
        client = createClient();
      }
      await client.connect();
      return new RedisConnection(client);
    } catch (error) {
      throw error;
    }
  },
};
