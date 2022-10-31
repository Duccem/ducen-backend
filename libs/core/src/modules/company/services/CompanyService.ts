import { ErrorTypes, GeneralError, GeneralResponse, ResponseTypes } from '@ducen/adaptors';
import { Inject, Injectable } from '@nestjs/common';
import { ProfileRepository } from '../../profile/domain/ProfileRepository';
import { User } from '../../user/domain/User';
import { UserRepository } from '../../user/domain/UserRepository';
import { RegisterCompanyDTO } from '../domain/classes/dtos/RegisterCompanyDTO';
import { Company } from '../domain/classes/entities/Company';
import { CompanyRepository } from '../domain/interfaces/CompanyRepository';
@Injectable()
export class CompanyService {
  constructor(
    @Inject('COMPANY_REPOSITORY')
    private companyRepository: CompanyRepository,
    @Inject('USER_REPOSITORY')
    private userRepository: UserRepository,
    @Inject('PROFILE_REPOSITORY')
    private profileRepository: ProfileRepository,
    @Inject('AUTH_KEY') private authKey: string,
  ) {}

  async insert(data: any) {
    const company = new Company(data);
    await this.companyRepository.createAndSave(company);
    return company.toPrimitives('show');
  }

  async get() {
    const [companies, count] = await Promise.all([this.companyRepository.list(50, 0), this.companyRepository.count()]);
    return new GeneralResponse(ResponseTypes.LISTED, {
      data: Company.toArray(companies),
      limit: 50,
      offset: 1,
      total: count,
    });
  }

  async getOne(id: string) {
    const company = await this.companyRepository.findOne(id);
    return company.toPrimitives('show');
  }

  async register({ company, user }: RegisterCompanyDTO) {
    const newCompany = new Company(company);
    console.log(newCompany);
    const admin = new User(user);
    const [existUserByUsername, existUserByEmail, existCompany] = await Promise.all([
      this.userRepository.getOneByIdentifier(admin.username),
      this.userRepository.getOneByIdentifier(admin.mail),
      this.companyRepository.findBySerial(newCompany.serialNumber),
    ]);

    if (existCompany) throw new GeneralError(ErrorTypes.BAD_REQUEST, 'The company already exist');
    if (existUserByUsername || existUserByEmail) throw new GeneralError(ErrorTypes.BAD_REQUEST, 'The user already exist');

    await this.companyRepository.createAndSave(newCompany);

    admin.password.encrypt();
    admin.company = company._id;
    await this.userRepository.insert(admin);
    const profile = await this.profileRepository.get(admin.profile as string);
    admin.profile = profile;

    return new GeneralResponse(ResponseTypes.CREATED, {
      data: {
        company: newCompany.toPrimitives('show'),
        user: admin.toPrimitives('show'),
        token: admin.generateToken(this.authKey),
      },
    });
  }
}
