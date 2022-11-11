import { Aggregate } from '@ducen/shared';
import 'reflect-metadata';
import { GeneralResponse, ResponseTypes } from '../domain/Response';
export const ResponseDecorator = (type: ResponseTypes) => {
  return function (target: any, propertyName: string, descriptor: any) {
    const method = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const response = await method.apply(this, args);
      if (response instanceof Aggregate) return new GeneralResponse(type, { data: response.toPrimitives('show') });
      if (response.count && Array.isArray(response.data))
        return new GeneralResponse(type, {
          data: Aggregate.toArray(response.data),
          limit: response.limit,
          offset: response.offset,
          total: response.count,
        });
      if (!response) return new GeneralResponse(type, { data: null });
      return new GeneralResponse(type, { data: response.data });
    };
  };
};
