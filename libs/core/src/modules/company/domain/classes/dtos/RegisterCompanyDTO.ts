import { User } from '@ducen/core';
import { JsonDocument } from '@ducen/shared';
import { Company } from '../entities/Company';

export class RegisterCompanyDTO {
  company: JsonDocument<Company>;
  user: JsonDocument<User>;
}
