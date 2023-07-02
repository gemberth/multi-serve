import { Test, TestingModule } from '@nestjs/testing';
import { JineteService } from './jinete.service';

describe('JineteService', () => {
  let service: JineteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JineteService],
    }).compile();

    service = module.get<JineteService>(JineteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
