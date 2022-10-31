import { Nullable } from '@ducen/shared';
import { RedisClientType } from 'redis';

export interface StoreConnection {
  getConnection(): Nullable<RedisClientType>;
}
