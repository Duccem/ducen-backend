/* eslint-disable @typescript-eslint/ban-types */

import { Document } from 'mongodb';
import { CompoundValueObject } from '../ValueObjects/Base/CompoundValueObject';
import { EnumValueObject } from '../ValueObjects/Base/EnumValueObject';
import { PrimitiveValueObject } from '../ValueObjects/Base/PrimitiveValueObject';
import { Primitive } from './Primitive';

export type LiteralObject = Record<string, unknown>;

export type Methods<T> = {
  [P in keyof T]: T[P] extends Function ? P : never;
}[keyof T];

export type Nested<T> = {
  [P in keyof T]: T[P] extends ValueObject ? P : never;
}[keyof T];

export type ValueObject = PrimitiveValueObject<Primitive> | EnumValueObject<any> | CompoundValueObject<any>;

export type MethodsAndProperties<T> = { [key in keyof T]: T[key] };

export type Properties<T> = Omit<MethodsAndProperties<T>, Methods<T>>;

type ValueObjectValue<T> = {
  [key in keyof T]: T[key] extends { value: unknown }
    ? Pick<T[key], 'value'>['value']
    : T[key] extends Array<{ value: unknown }>
    ? T[key][number]['value'] extends Object
      ? Primitives<T[key][number]['value']>[]
      : Primitives<T[key][number]>[]
    : T[key] extends LiteralObject
    ? Primitives<T[key]>
    : T[key];
};

export type Primitives<T> = ValueObjectValue<Properties<T>> | Document;
