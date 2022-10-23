import { MongoConnection } from '@ducen/adaptors';
import { Company, MongoCompanyRepository, MongoUserRepository, User } from '@ducen/core';
import { Provider } from '@nestjs/common';

export const repositories: Provider[] = [
  {
    provide: 'COMPANY_REPOSITORY',
    inject: ['DATABASE_CONNECTION'],
    useFactory: (connection: MongoConnection) => new MongoCompanyRepository(connection, Company),
  },
  {
    provide: 'USER_REPOSITORY',
    inject: ['DATABASE_CONNECTION'],
    useFactory: (connection: MongoConnection) => new MongoUserRepository(connection, User),
  },
];
