import { DatabaseModule, DomainEventRegisterObservers, FirebaseSender, LoggerMiddleware, MailSender, NestLogger } from '@ducen/adaptors';
import { CloudinaryUploader } from '@ducen/adaptors/archive/adaptors/ClodinaryUploader';
import { CaslAbilityMaker, CompanyService, ProfileService, ProfileSubscriber, UserAccessService, UserService } from '@ducen/core';
import { Translator } from '@ducen/shared/domain/Translator';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import authConfig from './config/auth.config';
import dbConfig from './config/db.config';
import { getEnv } from './config/env.config';
import firebaseConfig from './config/firebase.config';
import imageConfig from './config/image.config';
import mailConfig from './config/mail.config';
import messageConfig from './config/message.config';
import { AuthController } from './controllers/auth.controller';
import { CompanyController } from './controllers/company.controller';
import { ProfileController } from './controllers/profile.controller';
import { UserController } from './controllers/user.controller';
import { MainApiController } from './main-api.controller';
import { MainApiService } from './main-api.service';
import { redisConnection, store } from './providers/cache.providers';
import { names, repositories } from './providers/database.providers';
import { EventBusConnection, EventBusProvider } from './providers/messaging.provider';
import { strategies } from './providers/strategies.provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnv(),
      load: [dbConfig, authConfig, firebaseConfig, mailConfig, messageConfig, imageConfig],
    }),
    DatabaseModule.register({ repositories: repositories, repositories_names: names }),
    MulterModule.register({
      storage: diskStorage({
        destination: join(process.cwd(), 'apps/main-api/src/public/images/'),
        filename: (req, file, cb) => {
          cb(null, new Date().getTime() + extname(file.originalname));
        },
      }),
    }),
  ],
  controllers: [MainApiController, CompanyController, UserController, AuthController, ProfileController],
  providers: [
    MainApiService,
    CompanyService,
    UserService,
    ProfileService,
    ConfigService,
    ProfileSubscriber,
    DomainEventRegisterObservers,
    FirebaseSender,
    MailSender,
    UserAccessService,
    CloudinaryUploader,
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
    redisConnection,
    store,
    EventBusConnection,
    EventBusProvider,
    ...strategies,
    {
      provide: Translator,
      useValue: new Translator(),
    },
  ],
})
export class MainApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
