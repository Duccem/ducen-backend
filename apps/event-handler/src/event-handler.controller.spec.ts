import { Test, TestingModule } from '@nestjs/testing';
import { EventHandlerController } from './event-handler.controller';
import { EventHandlerService } from './event-handler.service';

describe('EventHandlerController', () => {
  let eventHandlerController: EventHandlerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EventHandlerController],
      providers: [EventHandlerService],
    }).compile();

    eventHandlerController = app.get<EventHandlerController>(EventHandlerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(eventHandlerController.getHello()).toBe('Hello World!');
    });
  });
});
