import { Module } from '@nestjs/common';
import { UbicacionService } from './ubicacion.service';
import { UbicacionController } from './ubicacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ubicacion } from './entities/ubicacion.entity';
import { UbicacionRepository } from './repositories/ubicacion.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Ubicacion])],
  controllers: [UbicacionController],
  providers: [UbicacionService, UbicacionRepository],
})
export class UbicacionModule { }
