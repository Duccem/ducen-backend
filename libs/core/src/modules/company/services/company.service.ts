import { Inject, Injectable } from '@nestjs/common';
import { Company } from '../domain/classes/entities/company.aggregate';
import { CompanyRepository } from '../domain/interfaces/icompany.repository';
@Injectable()
export class CompanyService {
  constructor(
    @Inject('COMPANY_REPOSITORY')
    private companyRepository: CompanyRepository,
  ) {}

  async insert(data: any) {
    const company = new Company(data);
    await this.companyRepository.createAndSave(company);
    return company.toPrimitives('show');
  }

  async get() {
    const companies = await this.companyRepository.getAll();
    return Company.toArray(companies);
  }

  async getOne(id: string) {
    const company = await this.companyRepository.findOne(id);
    return company.toPrimitives('show');
  }
}
