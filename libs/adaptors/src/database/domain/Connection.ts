import { Db } from 'mongodb';
import { Nullable } from '../../shared/domain/types/Nullable';

export interface Connection {
  getConnection(): Nullable<Db>;
}
