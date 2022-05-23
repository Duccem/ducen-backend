import { Test, TestingModule } from '@nestjs/testing';
import { AdaptorsService } from './adaptors.service';

describe('AdaptorsService', () => {
  let service: AdaptorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdaptorsService],
    }).compile();

    service = module.get<AdaptorsService>(AdaptorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
