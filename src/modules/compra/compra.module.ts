import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompraController } from './compra.controller';
import { CompraService } from './compra.service';
import { CompraRepository } from './repositories/compra.repository';
import { CompraDetalleRepository } from './repositories/compra-detalle.repository';
import { CompraEstadoRepository } from './repositories/compra-estado.repository';
import { InventarioModule } from '../inventario/inventario.module';
import { SucursalModule } from '../sucursal/sucursal.module';
import { UnidadMedidaModule } from '../unidad-medida/unidad-medida.module';
import { TasaCambioModule } from '../tasa-cambio/tasa-cambio.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CompraRepository,
      CompraDetalleRepository,
      CompraEstadoRepository,
    ]),
    InventarioModule,
    SucursalModule,
    UnidadMedidaModule,
    TasaCambioModule,
  ],
  controllers: [CompraController],
  providers: [
    CompraService,
    CompraRepository,
    CompraDetalleRepository,
    CompraEstadoRepository,
  ],
})
export class CompraModule {}
