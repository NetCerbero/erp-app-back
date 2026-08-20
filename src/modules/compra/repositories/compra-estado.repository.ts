import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CompraEstado } from '../entities/compra-estado.entity';

@Injectable()
export class CompraEstadoRepository extends Repository<CompraEstado> {
  constructor(private readonly data: DataSource) {
    super(CompraEstado, data.createEntityManager());
  }
}