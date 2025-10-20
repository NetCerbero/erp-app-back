import { Test, TestingModule } from '@nestjs/testing';
import { DominioController } from './dominio.controller';
import { DominioService } from './dominio.service';

describe('DominioController', () => {
  let controller: DominioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DominioController],
      providers: [DominioService],
    }).compile();

    controller = module.get<DominioController>(DominioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
