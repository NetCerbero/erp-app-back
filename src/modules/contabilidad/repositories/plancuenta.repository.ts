import { DataSource, Repository } from 'typeorm';
import { PlanCuenta } from '../entities/contabilidad.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PlanCuentaRepository extends Repository<PlanCuenta> {
  constructor(private readonly data: DataSource) {
    super(PlanCuenta, data.createEntityManager());
  }
}
