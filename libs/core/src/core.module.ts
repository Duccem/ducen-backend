import { Module } from '@nestjs/common';
import { CoreService } from './core.service';
import { ProfileModule } from './modules/profile/profile.module';

@Module({
  providers: [CoreService],
  exports: [CoreService],
  imports: [ProfileModule],
})
export class CoreModule {}
