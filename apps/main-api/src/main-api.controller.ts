import { Translator } from '@ducen/shared/domain/Translator';
import { Controller, Get, Render } from '@nestjs/common';
import { MainApiService } from './main-api.service';

@Controller()
export class MainApiController {
  constructor(private readonly mainApiService: MainApiService, private translator: Translator) {}

  @Get('health-check')
  healthCheck(): string {
    return this.translator.translate('greeting');
  }

  @Get('subscribe')
  @Render('subscribe')
  subscribe() {
    return {};
  }
}
