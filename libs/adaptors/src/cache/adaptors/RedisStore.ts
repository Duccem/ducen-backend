import { Aggregate, Constructor, Nullable } from '@ducen/shared';
import { Store } from '../domain/Store';
import { StoreConnection } from '../domain/StoreConnection';

export class RedisStore implements Store {
  constructor(private connection: StoreConnection) {}
  protected get client() {
    return this.connection.getConnection();
  }

  async set<T extends Aggregate>(model: Constructor<T>, val: T | Array<T>, time: number): Promise<boolean> {
    const stringVal = Array.isArray(val) ? JSON.stringify(val.map((v) => v.toPrimitives('show'))) : JSON.stringify(val.toPrimitives('show'));
    const setKey = Array.isArray(val) ? model.name.toLowerCase() : `${model.name.toLowerCase()}/${val._id}`;
    const result = await this.client.setEx(setKey, time, stringVal);
    return result ? true : false;
  }

  async get<T extends Aggregate>(model: Constructor<T>, key?: string): Promise<Nullable<T | Array<T>>> {
    console.log(model);
    const getKey = key ? `${model.name.toLowerCase()}/${key}` : model.name.toLowerCase();
    const stringVal = await this.client.get(getKey);
    if (!stringVal) return null;
    const parsedVal = JSON.parse(stringVal);
    if (Array.isArray(parsedVal)) return parsedVal.map((val) => new model(val));
    return new model(parsedVal);
  }

  async delete<T extends Aggregate>(model: Constructor<T>, key?: string): Promise<boolean> {
    const delKey = key ? `${model.name.toLowerCase()}/${key}` : model.name.toLowerCase();
    const result = await this.client.del(delKey);
    return result ? true : false;
  }

  async count<T extends Aggregate>(model: Constructor<T>): Promise<number> {
    const getKey = `${model.name.toLowerCase()}/count`;
    const result = await this.client.get(getKey);
    return new Number(result).valueOf();
  }

  async setCount<T extends Aggregate>(model: Constructor<T>, count: number): Promise<boolean> {
    const setKey = `${model.name.toLowerCase()}/count`;
    const result = await this.client.setEx(setKey, 60 * 60 * 24, count.toString());
    return result ? true : false;
  }
}
