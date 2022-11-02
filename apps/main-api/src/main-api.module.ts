import { DatabaseModule, FirebaseSender, InMemoryEventBus, InMemoryObserversRegister, LoggerMiddleware, NestLogger } from '@ducen/adaptors';
import { CaslAbilityMaker, CompanyService, ProfileService, ProfileSubscriber, UserAccessService, UserService } from '@ducen/core';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import authConfig from './config/auth.config';
import { redisConnection, store } from './config/cache.providers';
import { names, repositories } from './config/database.providers';
import dbConfig from './config/db.config';
import { getEnv } from './config/env.config';
import firebaseConfig from './config/firebase.config';
import { strategies } from './config/strategies.provider';
import { AuthController } from './controllers/auth.controller';
import { CompanyController } from './controllers/company.controller';
import { ProfileController } from './controllers/profile.controller';
import { UserController } from './controllers/user.controller';
import { MainApiController } from './main-api.controller';
import { MainApiService } from './main-api.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnv(),
      load: [dbConfig, authConfig, firebaseConfig],
    }),
    DatabaseModule.register({ repositories: repositories, repositories_names: names }),
  ],
  controllers: [MainApiController, CompanyController, UserController, AuthController, ProfileController],
  providers: [
    MainApiService,
    CompanyService,
    UserAccessService,
    UserService,
    ProfileService,
    ConfigService,
    ProfileSubscriber,
    InMemoryObserversRegister,
    FirebaseSender,
    { provide: 'MY_LOGGER', useValue: new NestLogger() },
    {
      provide: 'AUTH_KEY',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configService.get<string>('auth.key');
      },
    },
    {
      provide: 'ABILITY_MAKER',
      useValue: new CaslAbilityMaker(),
    },
    {
      provide: 'MESSAGE_QUEUE',
      useValue: new InMemoryEventBus(),
    },
    redisConnection,
    store,
    ...strategies,
  ],
})
export class MainApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
