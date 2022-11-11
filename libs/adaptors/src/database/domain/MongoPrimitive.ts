import { Primitives } from '@ducen/shared';
import { Document } from 'mongodb';

export type MongoPrimitive<T> = Primitives<T> | Document;
