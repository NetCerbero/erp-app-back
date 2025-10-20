import { Module } from '@nestjs/common';
import { ContabilidadService } from './contabilidad.service';
import { ContabilidadController } from './contabilidad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanCuenta } from './entities/contabilidad.entity';
import { PlanCuentaRepository } from './repositories/plancuenta.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PlanCuenta])],
  controllers: [ContabilidadController],
  providers: [PlanCuentaRepository, ContabilidadService],
})
export class ContabilidadModule {}
