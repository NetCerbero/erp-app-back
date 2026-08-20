import { DataSource, Repository } from 'typeorm';
import { Cuenta } from '../entities/cuenta.entity';
import { Injectable } from '@nestjs/common';
import { CuentaAnalitico } from '../entities/cuenta-analitico.entity';

@Injectable()
export class CuentaAnaliticoRepository extends Repository<CuentaAnalitico> {
  constructor(private readonly data: DataSource) {
    super(Cuenta, data.createEntityManager());
  }
}
