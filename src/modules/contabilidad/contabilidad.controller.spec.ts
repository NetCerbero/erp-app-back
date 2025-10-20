import { Test, TestingModule } from '@nestjs/testing';
import { ContabilidadController } from './contabilidad.controller';
import { ContabilidadService } from './contabilidad.service';

describe('ContabilidadController', () => {
  let controller: ContabilidadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContabilidadController],
      providers: [ContabilidadService],
    }).compile();

    controller = module.get<ContabilidadController>(ContabilidadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
