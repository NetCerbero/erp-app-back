import { Test, TestingModule } from '@nestjs/testing';
import { ContabilidadService } from './contabilidad.service';

describe('ContabilidadService', () => {
  let service: ContabilidadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContabilidadService],
    }).compile();

    service = module.get<ContabilidadService>(ContabilidadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
