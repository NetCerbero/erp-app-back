import { DataSource, Repository } from 'typeorm';
import { Proveedor } from '../entities/proveedor.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProveedorRepository extends Repository<Proveedor> {
  constructor(private readonly source: DataSource) {
    super(Proveedor, source.createEntityManager());
  }
}
