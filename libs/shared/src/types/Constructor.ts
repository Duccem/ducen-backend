import { JsonDocument } from './JsonDocument';

export type Constructor<T> = new (payload: JsonDocument<T>) => T;
