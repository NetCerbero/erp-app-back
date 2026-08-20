import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InventarioMovimiento } from '../entities/inventario-movimiento.entity';

@Injectable()
export class InventarioMovimientoRepository extends Repository<InventarioMovimiento> {
  constructor(private readonly source: DataSource) {
    super(InventarioMovimiento, source.createEntityManager());
  }
}
