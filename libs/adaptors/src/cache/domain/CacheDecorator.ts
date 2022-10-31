import { Aggregate, Constructor } from '@ducen/shared';
import { Inject } from '@nestjs/common';
import 'reflect-metadata';
const EXPIRE_KEY = 60 * 60;
export const GetCacheData = <T extends Aggregate>(model: Constructor<T>) => {
  return function (target: any, propertyName: string, descriptor: any) {
    const method = descriptor.value;
    const injectService = Inject('CACHE_STORE');
    injectService(target, 'store');

    descriptor.value = async function (...args: any[]) {
      const [data, count] = await Promise.all([this.store.get(model, args[0]), this.store.count(model)]);
      args.push(data);
      args.push(count);

      //exec method
      const response = await method.apply(this, args);

      // save in cache
      if (!data) {
        if (response.count) {
          await Promise.all([this.store.set(model, response.data, EXPIRE_KEY), this.store.setCount(model, response.count)]);
        } else {
          await this.store.set(model, response, EXPIRE_KEY);
        }
      }

      return response;
    };
  };
};
