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

@Module({
  imports: [
    TypeOrmModule.forFeature([Producto, ProductoSucursal]),
    SucursalModule,
    UsuarioModule,
  ],
  controllers: [ProductoController],
  providers: [ProductoService, ProductoRepository, ProductoSucursalRepository],
})
export class ProductoModule {}
