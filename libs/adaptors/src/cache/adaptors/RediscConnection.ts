import { RedisClientType } from 'redis';
import { StoreConnection } from '../domain/StoreConnection';

export class RedisConnection implements StoreConnection {
  constructor(private connection: any) {}
  getConnection(): RedisClientType {
    return this.connection;
  }
}
