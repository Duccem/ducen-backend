import { Repository } from '@ducen/adaptors';
import { Criteria } from '@ducen/shared';
import { Company } from '../classes/entities/Company';

export interface CompanyRepository extends Repository<Company> {
  createAndSave(data: any): Promise<void>;
  getAll(): Promise<Company[]>;
  findOne(id: string): Promise<Company>;
  matching(criteria: Criteria): Promise<Company[]>;
  findBySerial(serial: string): Promise<Company>;
}
