import { Module } from '@nestjs/common';

import { AdaptorsService } from './adaptors.service';
import { AuthModule } from './auth/auth.module';
import { HttpModule } from './http/http.module';
import { MessagingModule } from './messaging/messaging.module';

@Module({
  providers: [AdaptorsService],

  exports: [AdaptorsService],

  imports: [HttpModule, AuthModule, MessagingModule],
})
export class AdaptorsModule {}
