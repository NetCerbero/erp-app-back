import { DataSource, Repository } from 'typeorm';
import { ProductoListaPrecio } from '../entities/producto-lista-precio.entity';
import { Injectable } from '@nestjs/common';
import { ProductoListaPrecioDetalle } from '../entities/producto-lista-precio-detalle.entity';

@Injectable()
export class ProductoListaPrecioDetalleRepository extends Repository<ProductoListaPrecioDetalle> {
  constructor(private readonly source: DataSource) {
    super(ProductoListaPrecioDetalle, source.createEntityManager());
  }
}
