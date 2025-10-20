import { Module } from '@nestjs/common';
import { PermisoService } from './permiso.service';
import { PermisoController } from './permiso.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accion } from './entities/accion.entity';
import { Modulo } from './entities/modulo.entity';
import { Pagina } from './entities/pagina.entity';
import { Permiso } from './entities/permiso.entity';
import { PermisoAccion } from './entities/permiso-accion.entity';
import { AccionRepository } from './repositories/accion.repository';
import { ModuloRepository } from './repositories/modulo.repository';
import { PaginaRepository } from './repositories/pagina.repository';
import { PermisoRepository } from './repositories/permiso.repository';
import { PermisoAccionRepository } from './repositories/permiso-accion.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Accion,
      Modulo,
      Pagina,
      Permiso,
      PermisoAccion
    ])
  ],
  controllers: [PermisoController],
  providers: [
    AccionRepository,
    ModuloRepository,
    PaginaRepository,
    PermisoRepository,
    PermisoAccionRepository,
    PermisoService
  ],
  exports:[PermisoService]
})
export class PermisoModule { }
