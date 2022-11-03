import { Test, TestingModule } from '@nestjs/testing';
import { CronSchedulerController } from './cron-scheduler.controller';
import { CronSchedulerService } from './cron-scheduler.service';

describe('CronSchedulerController', () => {
  let cronSchedulerController: CronSchedulerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CronSchedulerController],
      providers: [CronSchedulerService],
    }).compile();

    cronSchedulerController = app.get<CronSchedulerController>(CronSchedulerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(cronSchedulerController.getHello()).toBe('Hello World!');
    });
  });
});
