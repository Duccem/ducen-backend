import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 } from 'cloudinary';
import { unlink } from 'fs-extra';
import { Uploader, UploaderResponse } from '../domain/uploader';

@Injectable()
export class CloudinaryUploader implements Uploader {
  constructor(private configService: ConfigService) {
    v2.config({
      cloud_name: this.configService.get<string>('image.cloudName'),
      api_key: this.configService.get<string>('image.apiKey'),
      api_secret: this.configService.get<string>('image.apiSecret'),
    });
  }
  async upload(file: string): Promise<UploaderResponse> {
    const { public_id, url } = await v2.uploader.upload(file);
    await unlink(file);
    return { remote_id: public_id, url };
  }
}
