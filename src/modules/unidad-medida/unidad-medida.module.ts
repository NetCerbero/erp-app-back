import { Module } from '@nestjs/common';
import { UnidadMedidaController } from './unidad-medida.controller';
import { UnidadMedidaService } from './unidad-medida.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnidadMedidaRepository } from './repositories/unidad-medida.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UnidadMedidaRepository])],
  controllers: [UnidadMedidaController],
  providers: [UnidadMedidaService,UnidadMedidaRepository],
  exports: [UnidadMedidaService],
})
export class UnidadMedidaModule {}
