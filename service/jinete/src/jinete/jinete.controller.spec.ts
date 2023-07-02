import { Test, TestingModule } from '@nestjs/testing';
import { JineteController } from './jinete.controller';

describe('JineteController', () => {
  let controller: JineteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JineteController],
    }).compile();

    controller = module.get<JineteController>(JineteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
