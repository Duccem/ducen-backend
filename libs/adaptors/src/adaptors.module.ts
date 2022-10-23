import { Module } from '@nestjs/common';

import { AdaptorsService } from './adaptors.service';
import { HttpModule } from './http/http.module';
import { AuthModule } from './auth/auth.module';

@Module({
  providers: [AdaptorsService],

  exports: [AdaptorsService],

  imports: [HttpModule, AuthModule],
})
export class AdaptorsModule {}
