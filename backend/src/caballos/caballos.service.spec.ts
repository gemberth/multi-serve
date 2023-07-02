import { Test, TestingModule } from '@nestjs/testing';
import { CaballosService } from './caballos.service';

describe('CaballosService', () => {
  let service: CaballosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CaballosService],
    }).compile();

    service = module.get<CaballosService>(CaballosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
