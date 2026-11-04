import { DataSource, Repository } from 'typeorm';
import { Sucursal } from '../entities/sucursal.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SucursalRepository extends Repository<Sucursal> {
  constructor(private readonly source: DataSource) {
    super(Sucursal, source.createEntityManager());
  }
}
