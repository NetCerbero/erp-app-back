import { DataSource, Repository } from 'typeorm';
import { UnidadMedida } from '../entities/unidad-medida.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UnidadMedidaRepository extends Repository<UnidadMedida> {
  constructor(private readonly source: DataSource) {
    super(UnidadMedida, source.createEntityManager());
  }
}
