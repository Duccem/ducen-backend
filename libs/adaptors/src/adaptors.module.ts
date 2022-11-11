import { Module } from '@nestjs/common';

import { AdaptorsService } from './adaptors.service';
import { AuthModule } from './auth/auth.module';
import { HttpModule } from './http/http.module';
import { MessagingModule } from './messaging/messaging.module';
import { NotificationModule } from './notification/notification.module';
import { ArchiveModule } from './archive/archive.module';

@Module({
  providers: [AdaptorsService],

  exports: [AdaptorsService],

  imports: [HttpModule, AuthModule, MessagingModule, NotificationModule, ArchiveModule],
})
export class AdaptorsModule {}
