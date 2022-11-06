import { NestLogger } from '@ducen/adaptors';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';
import { resolve } from 'path';
import { MainApiModule } from './main-api.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(MainApiModule, {
    logger: new NestLogger(),
  });
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.setGlobalPrefix('api');
  app.useStaticAssets(resolve(process.cwd(), 'apps/main-api/src/public'));
  app.setBaseViewsDir(resolve(process.cwd(), 'apps/main-api/src/views'));
  app.setViewEngine('hbs');
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
