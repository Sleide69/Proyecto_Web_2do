import { Test, TestingModule } from '@nestjs/testing';
import { CapturaService } from './captura.service';

describe('CapturaService', () => {
  let service: CapturaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CapturaService],
    }).compile();

    service = module.get<CapturaService>(CapturaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
