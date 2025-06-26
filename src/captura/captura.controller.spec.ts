import { Test, TestingModule } from '@nestjs/testing';
import { CapturaController } from './captura.controller';

describe('CapturaController', () => {
  let controller: CapturaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CapturaController],
    }).compile();

    controller = module.get<CapturaController>(CapturaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
