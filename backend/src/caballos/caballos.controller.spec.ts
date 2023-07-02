import { Test, TestingModule } from '@nestjs/testing';
import { CaballosController } from './caballos.controller';

describe('CaballosController', () => {
  let controller: CaballosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CaballosController],
    }).compile();

    controller = module.get<CaballosController>(CaballosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
