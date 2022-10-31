import { Nullable } from '@ducen/shared';
import { Db } from 'mongodb';

export interface DBConnection {
  getConnection(): Nullable<Db>;
}
