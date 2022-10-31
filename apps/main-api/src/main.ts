import { NestLogger } from '@ducen/adaptors';
import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import { MainApiModule } from './main-api.module';

async function bootstrap() {
  const app = await NestFactory.create(MainApiModule, {
    logger: new NestLogger(true),
  });
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );
  await app.listen(3000);
}
bootstrap();
