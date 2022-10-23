import { AuthStrategy, DatabaseModule, LoggerMiddleware, NestLogger } from '@ducen/adaptors';
import { CompanyService } from '@ducen/core';
import { UserAccessService } from '@ducen/core/modules/user/services/UserAccessService';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import authConfig from './config/auth.config';
import { repositories } from './config/database.providers';
import dbConfig from './config/db.config';
import { getEnv } from './config/env.config';
import { CompanyController } from './controllers/company.controller';
import { UserController } from './controllers/user.controller';
import { MainApiController } from './main-api.controller';
import { MainApiService } from './main-api.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnv(),
      load: [dbConfig, authConfig],
    }),
    DatabaseModule.register({ repositories: repositories, repositories_names: ['COMPANY_REPOSITORY', 'USER_REPOSITORY'] }),
  ],
  controllers: [MainApiController, CompanyController, UserController],
  providers: [
    MainApiService,
    CompanyService,
    UserAccessService,
    { provide: 'MY_LOGGER', useValue: new NestLogger(true) },
    {
      provide: 'AUTH_KEY',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configService.get<string>('auth.key');
      },
    },
    AuthStrategy,
  ],
})
export class MainApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('company');
  }
}
