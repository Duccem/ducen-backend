import { MongoRepository } from '@ducen/adaptors';
import { Company } from '../domain/classes/entities/company.aggregate';
import { CompanyRepository } from '../domain/interfaces/icompany.repository';

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
}
