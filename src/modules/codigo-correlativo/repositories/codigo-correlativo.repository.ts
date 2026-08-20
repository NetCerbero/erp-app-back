import { DataSource, Repository } from 'typeorm';
import { CodigoCorrelativo } from '../entities/codigo-correlativo.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CodigoCorrelativoRepository extends Repository<CodigoCorrelativo> {
  constructor(private readonly source: DataSource) {
    super(CodigoCorrelativo, source.createEntityManager());
  }
}
