import { MongoRepository } from '@ducen/adaptors';
import { Criteria, Nullable } from '@ducen/shared';
import { Company } from '../domain/classes/entities/Company';
import { CompanyRepository } from '../domain/interfaces/CompanyRepository';

export class MongoCompanyRepository extends MongoRepository<Company> implements CompanyRepository {
  async createAndSave(company: Company): Promise<void> {
    await this.collection.insertOne(company.toPrimitives('save'));
  }

  async getAll(): Promise<Company[]> {
    const data = await this.collection.find().toArray();
    return data.map((d) => new Company(d));
  }

  async findOne(id: string): Promise<Company> {
    const data = await this.collection.findOne({ _id: id });
    return new Company(data);
  }

  async matching(criteria: Criteria): Promise<Company[]> {
    const data = await this.criteria(criteria);
    return data;
  }

  async findBySerial(serial: string): Promise<Nullable<Company>> {
    const data = await this.collection.findOne({ serialNumber: serial });
    if (!data) return null;
    return new Company(data);
  }
}
