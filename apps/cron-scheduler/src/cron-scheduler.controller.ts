import { Controller, Get } from '@nestjs/common';
import { CronSchedulerService } from './cron-scheduler.service';

@Controller()
export class CronSchedulerController {
  constructor(private readonly cronSchedulerService: CronSchedulerService) {}

  @Get()
  getHello(): string {
    return this.cronSchedulerService.getHello();
  }
}
