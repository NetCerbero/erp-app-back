import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasaCambioRepository } from './repositories/tasa-cambio.repository';
import { TasaCambioService } from './tasa-cambio.service';
import { TasaCambioController } from './tasa-cambio.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TasaCambioRepository])],
  controllers: [TasaCambioController],
  providers: [TasaCambioService, TasaCambioRepository],
  exports: [TasaCambioService],
})
export class TasaCambioModule {}
