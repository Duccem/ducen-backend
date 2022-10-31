import { Injectable } from '@nestjs/common';
@Injectable()
export class MainApiService {
  healthCheck(): string {
    return 'API Works!';
  }
}
