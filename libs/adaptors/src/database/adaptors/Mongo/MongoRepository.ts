import { Aggregate, Constructor, Criteria, Nullable } from '@ducen/shared';
import { Collection } from 'mongodb';
import { Repository } from '../../domain/Repository';
import { MongoConnection } from './MongoConnection';
import { MongoCriteriaConverter } from './MongoCriteriaConverter';

export class MongoRepository<T extends Aggregate> implements Repository<T> {
  protected converter: MongoCriteriaConverter = new MongoCriteriaConverter();
  constructor(private connection: MongoConnection, private model: Constructor<T>) {}
  public get collection(): Collection {
    return this.connection.getConnection().collection(this.model.name.toLowerCase());
  }

  public async criteria(criteria?: Criteria): Promise<T[]> {
    const query = this.converter.convert(criteria);
    const results = await this.collection.find(query.filter, {}).sort(query.sort).skip(query.skip).limit(query.limit).toArray();
    return results.map((r) => new this.model(r));
  }

  public async aggregate(aggregation: any[]): Promise<T[]> {
    const results = await this.collection.aggregate(aggregation).toArray();
    return results.map((r) => new this.model(r));
  }

  public async get(id: string): Promise<Nullable<T>> {
    const result = await this.collection.findOne({ _id: id });
    if (!result) return null;
    return new this.model(result);
  }

  public async persist(id: string, data: T): Promise<void> {
    const document = { ...data.toPrimitives('save'), _id: id };
    await this.collection.updateOne({ _id: id }, { $set: document }, { upsert: true });
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

  public async search(text: string) {
    const documents = await this.collection
      .find({ $text: { $search: `"${text}"` } })
      .sort({ score: { $meta: 'textScore' } })
      .toArray();
    return documents.map((r) => new this.model(r));
  }

  public async configureTextIndexes(indexes: any) {
    await this.collection.createIndex(indexes);
  }
}
