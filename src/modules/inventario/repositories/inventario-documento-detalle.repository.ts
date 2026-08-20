import { DataSource, Repository } from 'typeorm';
import { InventarioDocumentoDetalle } from '../entities/inventario-documento-detalle.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InventarioDocumentoDetalleRepository extends Repository<InventarioDocumentoDetalle> {
  constructor(private readonly source: DataSource) {
    super(InventarioDocumentoDetalle, source.createEntityManager());
  }
}
