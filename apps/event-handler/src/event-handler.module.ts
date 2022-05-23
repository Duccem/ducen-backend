import { Module } from '@nestjs/common';
import { EventHandlerController } from './event-handler.controller';
import { EventHandlerService } from './event-handler.service';

@Module({
  imports: [],
  controllers: [EventHandlerController],
  providers: [EventHandlerService],
})
export class EventHandlerModule {}
