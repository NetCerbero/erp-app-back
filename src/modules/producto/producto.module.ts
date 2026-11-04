import { Module } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { ProductoRepository } from './repositories/producto.repository';
import { SucursalModule } from '../sucursal/sucursal.module';
import { UsuarioModule } from '../usuario/usuario.module';
import { ProductoSucursalRepository } from './repositories/producto-sucursal.repository';
import { ProductoSucursal } from './entities/producto-sucursal.entity';
import { ProductoListaPrecioController } from './producto-lista-precio.controller';
import { ProductoListaPrecioService } from './producto-lista-precio.service';
import { ProductoListaPrecioRepository } from './repositories/producto-lista-precio.repository';
import { ProductoListaPrecioDetalleRepository } from './repositories/producto-lista-precio-detalle.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Producto,
      ProductoSucursal,
      ProductoListaPrecioRepository,
      ProductoListaPrecioDetalleRepository,
    ]),
    SucursalModule,
    UsuarioModule,
  ],
  controllers: [ProductoController, ProductoListaPrecioController],
  providers: [
    ProductoService,
    ProductoRepository,
    ProductoSucursalRepository,
    ProductoListaPrecioService,
    ProductoListaPrecioRepository,
    ProductoListaPrecioDetalleRepository
  ],
})
export class ProductoModule {}
