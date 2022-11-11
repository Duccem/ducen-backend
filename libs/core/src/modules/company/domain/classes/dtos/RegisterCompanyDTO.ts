import { User } from '@ducen/core';
import { Primitives } from '@ducen/shared';
import { Company } from '../entities/Company';

export class RegisterCompanyDTO {
  company: Primitives<Company>;
  user: Primitives<User>;
}
