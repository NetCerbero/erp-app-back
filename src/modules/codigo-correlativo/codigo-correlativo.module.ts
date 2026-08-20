import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodigoCorrelativoRepository } from './repositories/codigo-correlativo.repository';
import { CodigoCorrelativoService } from './codigo-correlativo.service';

@Module({
  imports: [TypeOrmModule.forFeature([CodigoCorrelativoRepository])],
  providers: [CodigoCorrelativoService],
  exports: [CodigoCorrelativoService],
})
export class CodigoCorrelativoModule {}
