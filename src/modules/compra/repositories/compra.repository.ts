import { DataSource, Repository } from 'typeorm';
import { Compra } from '../entities/compra.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CompraRepository extends Repository<Compra> {
  constructor(private readonly data: DataSource) {
    super(Compra, data.createEntityManager());
  }
}
