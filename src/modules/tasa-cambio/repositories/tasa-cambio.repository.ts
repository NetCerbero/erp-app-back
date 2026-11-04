import { DataSource, Repository } from 'typeorm';
import { TasaCambio } from '../entities/tasa-cambio.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TasaCambioRepository extends Repository<TasaCambio> {
  constructor(private readonly source: DataSource) {
    super(TasaCambio, source.createEntityManager());
  }
}
