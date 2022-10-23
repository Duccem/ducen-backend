import { Nullable } from '@ducen/shared';
import { Db, MongoClient } from 'mongodb';
import { Connection } from '../domain/Connection';

export class MongoConnection implements Connection {
  constructor(private database: string, private connection: MongoClient) {}
  getConnection(): Nullable<Db> {
    return this.connection.db(this.database);
  }
}
