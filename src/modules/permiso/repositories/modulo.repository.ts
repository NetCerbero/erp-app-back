import { DataSource, Repository } from 'typeorm';
import { Modulo } from '../entities/modulo.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ModuloRepository extends Repository<Modulo> {
  constructor(private readonly source: DataSource) {
    super(Modulo, source.createEntityManager());
  }

  async truncateMysql() {
    const metaDato = this.manager.connection.getMetadata(Modulo);
    await this.manager.query('SET FOREIGN_KEY_CHECKS = 0;');
    await this.manager.query(`TRUNCATE TABLE ${metaDato.tableName};`);
    await this.manager.query('SET FOREIGN_KEY_CHECKS = 1;');
  }

  async truncatePg() {
    const metaDato = this.manager.connection.getMetadata(Modulo);
    await this.manager.query(
      `TRUNCATE TABLE "${metaDato.tableName}" RESTART IDENTITY CASCADE`,
    );
  }
}
