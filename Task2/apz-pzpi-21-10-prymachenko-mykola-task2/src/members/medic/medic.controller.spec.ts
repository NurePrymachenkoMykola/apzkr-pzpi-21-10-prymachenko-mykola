import { Test, TestingModule } from '@nestjs/testing';
import { MedicController } from './medic.controller';
import { MedicService } from './medic.service';

describe('MedicController', () => {
  let controller: MedicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicController],
      providers: [MedicService],
    }).compile();

    controller = module.get<MedicController>(MedicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
