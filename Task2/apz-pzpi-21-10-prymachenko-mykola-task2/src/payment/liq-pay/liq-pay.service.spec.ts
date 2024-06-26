import { Test, TestingModule } from '@nestjs/testing';
import { LiqPayService } from './liq-pay.service';

describe('LiqPayService', () => {
  let service: LiqPayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LiqPayService],
    }).compile();

    service = module.get<LiqPayService>(LiqPayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
