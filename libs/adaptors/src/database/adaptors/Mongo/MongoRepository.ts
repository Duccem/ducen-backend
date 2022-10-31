import { Aggregate, Constructor, Criteria, JsonDocument, Nullable } from '@ducen/shared';
import { Collection } from 'mongodb';
import { Repository } from '../../domain/Repository';
import { MongoConnection } from '../MongoConnection';
import { MongoCriteriaConverter } from './MongoCriteriaConverter';

export class MongoRepository<T extends Aggregate> implements Repository<T> {
  private converter: MongoCriteriaConverter = new MongoCriteriaConverter();
  constructor(private connection: MongoConnection, private model: Constructor<T>) {}
  public get collection(): Collection {
    return this.connection.getConnection().collection(this.model.name.toLowerCase());
  }

  public async searchByCriteria(criteria?: Criteria): Promise<T[]> {
    const query = this.converter.convert(criteria);
    const results = await this.collection.find(query.filter, {}).sort(query.sort).skip(query.skip).limit(query.limit).toArray();
    return results.map((r) => new this.model(r));
  }

  public async list(limit = 0, offset = 50): Promise<T[]> {
    const data = await this.collection.find().skip(offset).limit(limit).toArray();
    return data.map((r) => new this.model(r));
  }

  public async get(id: string): Promise<Nullable<T>> {
    const result = await this.collection.findOne({ _id: id });
    if (!result) return null;
    return new this.model(result);
  }

  public async insert(data: T): Promise<void> {
    const aggregate: any = data.toPrimitives('save');
    await this.collection.insertOne(aggregate);
  }

  public async update(id: string, data: JsonDocument<T>): Promise<void> {
    await this.collection.updateOne({ _id: id }, data);
  }
  public async delete(id: string): Promise<boolean> {
    const result = await this.collection.deleteOne({ _id: id });
    if (result.deletedCount == 0) return false;
    return true;
  }
  public async count(): Promise<number> {
    return await this.collection.countDocuments();
  }

  public async exist(id: string): Promise<boolean> {
    const exist = await this.collection.findOne({ _id: id });
    return exist ? true : false;
  }
}
