import { NestFactory } from '@nestjs/core';
import { EventHandlerModule } from './event-handler.module';

async function bootstrap() {
  const app = await NestFactory.create(EventHandlerModule);
  await app.listen(3001);
}
bootstrap();
