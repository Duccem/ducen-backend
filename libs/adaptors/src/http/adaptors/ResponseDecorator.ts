import { Aggregate } from '@ducen/shared';
import 'reflect-metadata';
import { GeneralResponse, ResponseTypes } from '../domain/Response';
export const ResponseDecorator = (type: ResponseTypes) => {
  return function (target: any, propertyName: string, descriptor: any) {
    const method = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const response = await method.apply(this, args);
      if (response) {
        if (response.count) {
          return new GeneralResponse(type, { data: Aggregate.toArray(response.data), limit: response.length, offset: 0, total: response.count });
        }
        return new GeneralResponse(type, { data: response.toPrimitives('show') });
      }
      return new GeneralResponse(type, { data: null });
    };
  };
};
