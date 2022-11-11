import { CloudinaryUploader } from '@ducen/adaptors/archive/adaptors/ClodinaryUploader';
import { Translator } from '@ducen/shared/domain/Translator';
import { Controller, Get, Post, Render, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MainApiService } from './main-api.service';

@Controller()
export class MainApiController {
  constructor(private readonly mainApiService: MainApiService, private translator: Translator, private cloudinaryService: CloudinaryUploader) {}

  @Get('health-check')
  healthCheck(): string {
    return this.translator.translate('greeting');
  }

  @Post('upload-image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile('file') file: Express.Multer.File) {
    const resCloudinary = await this.cloudinaryService.upload(file.path);
    return resCloudinary;
  }

  @Get('subscribe')
  @Render('subscribe')
  subscribe() {
    return {};
  }
}
