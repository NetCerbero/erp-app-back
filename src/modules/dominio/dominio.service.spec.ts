import { Test, TestingModule } from '@nestjs/testing';
import { DominioService } from './dominio.service';

describe('DominioService', () => {
  let service: DominioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DominioService],
    }).compile();

    service = module.get<DominioService>(DominioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
