import { Nullable } from '@ducen/shared';
import { Db } from 'mongodb';

export interface Connection {
  getConnection(): Nullable<Db>;
}
