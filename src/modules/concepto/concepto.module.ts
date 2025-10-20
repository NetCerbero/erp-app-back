import { Module } from '@nestjs/common';
import { ConceptoService } from './concepto.service';
import { ConceptoController } from './concepto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Concepto } from './entities/concepto.entity';
import { ConceptoRepository } from './repositories/concepto.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Concepto])],
  controllers: [ConceptoController],
  providers: [ConceptoRepository, ConceptoService],
})
export class ConceptoModule { }
