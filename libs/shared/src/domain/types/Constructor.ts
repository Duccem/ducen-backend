import { Primitives } from './Primitives';

export type Constructor<T> = new (payload: Primitives<T>) => T;
