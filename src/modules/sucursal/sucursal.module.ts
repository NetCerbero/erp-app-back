import { Module } from '@nestjs/common';
import { SucursalService } from './sucursal.service';
import { SucursalController } from './sucursal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SucursalRepository } from './repositories/sucursal.repository';
import { AlmacenService } from './almacen.service';
import { AlmacenRepository } from './repositories/almacen.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SucursalRepository, AlmacenRepository])],
  controllers: [SucursalController],
  providers: [
    SucursalService,
    AlmacenService,
    SucursalRepository,
    AlmacenRepository,
  ],
  exports: [SucursalService, AlmacenService],
})
export class SucursalModule {}
