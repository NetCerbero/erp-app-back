import { Module } from '@nestjs/common';
import { DominioService } from './dominio.service';
import { DominioController } from './dominio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dominio } from './entities/dominio.entity';
import { DominioRepository } from './repositories/dominio.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Dominio])
  ],
  controllers: [DominioController],
  providers: [DominioRepository, DominioService],
})
export class DominioModule { }
