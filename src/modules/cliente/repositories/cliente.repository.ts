import { DataSource, Repository } from 'typeorm';
import { Cliente } from '../entities/cliente.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClienteRepository extends Repository<Cliente> {
  constructor(private readonly source: DataSource) {
    super(Cliente, source.createEntityManager());
  }
}
