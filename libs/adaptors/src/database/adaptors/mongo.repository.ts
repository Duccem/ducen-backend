import { Aggregate, Constructor, Criteria, Nullable } from '@ducen/shared';
import { Collection } from 'mongodb';
import { Repository } from '../domain/Repository';
import { MongoConnection } from './mongo.connection';

export class MongoRepository<T extends Aggregate> implements Repository<T> {
  constructor(private connection: MongoConnection, private model: Constructor<T>) {}
  public get collection(): Collection {
    return this.connection.getConnection().collection(this.model.name.toLowerCase());
  }

  public async list(criteria?: Criteria): Promise<T[]> {
    const query = criteria ? criteria.isSatisfiedBy() : {};
    const results = await this.collection.aggregate([{ $match: { $expr: query } }]).toArray();
    return results.map((r) => new this.model(r));
  }

  public async get(id: string): Promise<Nullable<T>> {
    const result = await this.collection.findOne({ _id: id });
    return new this.model(result);
  }

  public async insert(data: T): Promise<void> {
    const aggregate: any = data.toPrimitives('save');
    await this.collection.insertOne(aggregate);
  }

  public async update(id: string, data: T): Promise<void> {
    await this.collection.updateOne({ _id: id }, data.toPrimitives('save'));
  }
  public async delete(id: string): Promise<boolean> {
    const result = await this.collection.deleteOne({ _id: id });
    if (result.deletedCount == 0) return false;
    return true;
  }
  public async count(): Promise<number> {
    return await this.collection.countDocuments();
  }
}
