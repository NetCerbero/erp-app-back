import { Module } from '@nestjs/common';
import { ContabilidadService } from './contabilidad.service';
import { ContabilidadController } from './contabilidad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cuenta } from './entities/cuenta.entity';
import { CuentaRepository } from './repositories/cuenta.repository';
import { CuentaAnalitico } from './entities/cuenta-analitico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cuenta, CuentaAnalitico])],
  controllers: [ContabilidadController],
  providers: [CuentaRepository, ContabilidadService],
})
export class ContabilidadModule {}
