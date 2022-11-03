import { NestFactory } from '@nestjs/core';
import { CronSchedulerModule } from './cron-scheduler.module';

async function bootstrap() {
  const app = await NestFactory.create(CronSchedulerModule);
  await app.listen(3000);
}
bootstrap();
