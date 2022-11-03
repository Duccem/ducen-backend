import { Injectable } from '@nestjs/common';

@Injectable()
export class CronSchedulerService {
  getHello(): string {
    return 'Hello World!';
  }
}
