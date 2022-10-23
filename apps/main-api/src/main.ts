import { NestLogger } from '@ducen/adaptors';
import { NestFactory } from '@nestjs/core';
import { MainApiModule } from './main-api.module';

async function bootstrap() {
  const app = await NestFactory.create(MainApiModule, {
    logger: new NestLogger(true),
  });
  await app.listen(3000);
}
bootstrap();
