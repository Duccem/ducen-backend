import { Document } from 'mongodb';

export type LiteralObject = Record<string, unknown>;

type Methods<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [P in keyof T]: T[P] extends Function ? P : never;
}[keyof T];

type MethodsAndProperties<T> = { [key in keyof T]: T[key] };

type Properties<T> = Omit<MethodsAndProperties<T>, Methods<T>>;

type ValueObjectValue<T> = {
  [key in keyof T]: T[key] extends { value: unknown }
    ? Pick<T[key], 'value'>['value']
    : T[key] extends Array<LiteralObject>
    ? JsonDocument<T[key][number]>[]
    : T[key] extends LiteralObject
    ? JsonDocument<T[key]>
    : T[key];
};

export type JsonDocument<T> = ValueObjectValue<Properties<T>> | Document;
