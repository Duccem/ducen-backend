import { MongoConnection } from '@ducen/adaptors';
import { Company, MongoCompanyRepository, MongoProfileRepository, MongoUserRepository, Profile, User } from '@ducen/core';
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
  {
    provide: 'PROFILE_REPOSITORY',
    inject: ['DATABASE_CONNECTION'],
    useFactory: (connection: MongoConnection) => new MongoProfileRepository(connection, Profile),
  },
];

export const names: string[] = ['COMPANY_REPOSITORY', 'USER_REPOSITORY', 'PROFILE_REPOSITORY'];
