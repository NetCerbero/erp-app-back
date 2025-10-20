import { Module } from '@nestjs/common';
import { SucursalService } from './sucursal.service';
import { SucursalController } from './sucursal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sucursal } from './entities/sucursal.entity';
import { SucursalRepository } from './repositories/sucursal.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Sucursal])],
  controllers: [SucursalController],
  providers: [SucursalService, SucursalRepository],
  exports:[SucursalService]
})
export class SucursalModule { }
