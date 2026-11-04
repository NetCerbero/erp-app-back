import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProveedorRepository } from './repositories/proveedor.repository';
import { ProveedorController } from './proveedor.controller';
import { ProveedorService } from './proveedor.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProveedorRepository])],
  controllers: [ProveedorController],
  providers: [ProveedorService,ProveedorRepository],
})
export class ProveedorModule {}
