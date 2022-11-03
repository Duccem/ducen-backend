import { Module } from '@nestjs/common';
import { CronSchedulerController } from './cron-scheduler.controller';
import { CronSchedulerService } from './cron-scheduler.service';

@Module({
  imports: [],
  controllers: [CronSchedulerController],
  providers: [CronSchedulerService],
})
export class CronSchedulerModule {}
