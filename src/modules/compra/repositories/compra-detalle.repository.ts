import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CompraDetalle } from '../entities/compra-detalle.entity';

@Injectable()
export class CompraDetalleRepository extends Repository<CompraDetalle> {
  constructor(private readonly data: DataSource) {
    super(CompraDetalle, data.createEntityManager());
  }
}