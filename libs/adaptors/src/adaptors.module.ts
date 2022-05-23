import { Module } from '@nestjs/common';
import { AdaptorsService } from './adaptors.service';

@Module({
  providers: [AdaptorsService],
  exports: [AdaptorsService],
})
export class AdaptorsModule {}
