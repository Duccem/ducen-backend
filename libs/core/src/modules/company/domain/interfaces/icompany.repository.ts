import { Repository } from '@ducen/adaptors';
import { Company } from '../classes/entities/company.aggregate';

export interface CompanyRepository extends Repository<Company> {
  createAndSave(data: any): Promise<void>;
  getAll(): Promise<Company[]>;
  findOne(id: string): Promise<Company>;
}
