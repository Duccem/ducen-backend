import { Controller, Get } from '@nestjs/common';
import { EventHandlerService } from './event-handler.service';

@Controller()
export class EventHandlerController {
  constructor(private readonly eventHandlerService: EventHandlerService) {}

  @Get()
  getHello(): string {
    return this.eventHandlerService.getHello();
  }
}
