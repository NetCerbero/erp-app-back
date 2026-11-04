import { DataSource, Repository } from 'typeorm';
import { ProductoListaPrecio } from '../entities/producto-lista-precio.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductoListaPrecioRepository extends Repository<ProductoListaPrecio> {
  constructor(private readonly source: DataSource) {
    super(ProductoListaPrecio, source.createEntityManager());
  }
}
