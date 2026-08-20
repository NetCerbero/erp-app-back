import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InventarioMovimientoDetalle } from '../entities/inventario-movimiento-detalle.entity';

@Injectable()
export class InventarioMovimientoDetalleRepository extends Repository<InventarioMovimientoDetalle> {
  constructor(private readonly source: DataSource) {
    super(InventarioMovimientoDetalle, source.createEntityManager());
  }
}
