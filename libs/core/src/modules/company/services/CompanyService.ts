import { ErrorTypes, GeneralError, ResponseDecorator, ResponseTypes } from '@ducen/adaptors';
import { Criteria, Filters, Order, OrderBy, OrderType, OrderTypes } from '@ducen/shared';
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

  @ResponseDecorator(ResponseTypes.CREATED)
  async insert(data: any) {
    const company = new Company(data);
    await this.companyRepository.createAndSave(company);
    return null;
  }

  @ResponseDecorator(ResponseTypes.LISTED)
  async get() {
    const criteria = new Criteria(new Filters([]), new Order(new OrderBy('id'), new OrderType(OrderTypes.ASC)), 50, 0);
    const [companies, count] = await Promise.all([this.companyRepository.criteria(criteria), this.companyRepository.count()]);
    return {
      data: companies,
      limit: 50,
      offset: 1,
      total: count,
    };
  }

  @ResponseDecorator(ResponseTypes.FOUNDED)
  async getOne(id: string) {
    const company = await this.companyRepository.findOne(id);
    return company;
  }

  @ResponseDecorator(ResponseTypes.CREATED)
  async register({ company, user }: RegisterCompanyDTO) {
    const newCompany = new Company(company);
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
    await this.userRepository.persist(admin._id, admin);
    const profile = await this.profileRepository.get(admin.profile as string);
    admin.profile = profile;

    return {
      data: {
        token: admin.generateToken(this.authKey),
      },
    };
  }
}
