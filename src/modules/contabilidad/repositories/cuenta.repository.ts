import { DataSource, Repository } from 'typeorm';
import { Cuenta } from '../entities/cuenta.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CuentaRepository extends Repository<Cuenta> {
  constructor(private readonly data: DataSource) {
    super(Cuenta, data.createEntityManager());
  }
}
