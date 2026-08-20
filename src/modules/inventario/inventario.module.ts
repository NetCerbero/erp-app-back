import { Module } from '@nestjs/common';
import { InventarioService } from './inventario.service';
import { InventarioController } from './inventario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventarioRepository } from './repositories/inventario.repository';
import { InventarioMovimientoRepository } from './repositories/inventario-movimiento.repository';
import { InventarioDocumentoDetalleRepository } from './repositories/inventario-documento-detalle.repository';
import { InventarioDocumentoRepository } from './repositories/inventario-documento.repository';
import { InventarioMovimientoDetalleRepository } from './repositories/inventario-movimiento-detalle.repository';
import { InventarioMovimientoService } from './inventario-movimiento.service';
import { CodigoCorrelativoModule } from '../codigo-correlativo/codigo-correlativo.module';
import { InventarioDocumentoController } from './inventario-documento.controller';
import { InventarioDocumentoService } from './inventario-documento.service';
import { SucursalModule } from '../sucursal/sucursal.module';

@Module({
  imports: [
    CodigoCorrelativoModule,
    SucursalModule,
    TypeOrmModule.forFeature([
      InventarioRepository,
      InventarioDocumentoRepository,
      InventarioDocumentoDetalleRepository,
      InventarioMovimientoRepository,
      InventarioMovimientoDetalleRepository,
    ]),
  ],
  controllers: [InventarioDocumentoController],
  providers: [
    InventarioService,
    InventarioMovimientoService,
    InventarioRepository,
    InventarioDocumentoRepository,
    InventarioDocumentoDetalleRepository,
    InventarioMovimientoRepository,
    InventarioMovimientoDetalleRepository,
    InventarioDocumentoService,
  ],
  exports: [
    InventarioDocumentoService,
    InventarioService,
    InventarioMovimientoService,
  ],
})
export class InventarioModule {}
