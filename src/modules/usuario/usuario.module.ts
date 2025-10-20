import { forwardRef, Module } from '@nestjs/common';
import { UsuarioService } from './services/usuario.service';
import { UsuarioController } from './controllers/usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Persona } from './entities/persona.entity';
import { Credencial } from './entities/credencial.entity';
import { PersonaRepository } from './repositories/persona.repository';
import { CredencialRepository } from './repositories/credencial.repository';
import { AccesoDominio } from './entities/acceso-dominio.entity';
import { Dominio } from '../dominio/entities/dominio.entity';
import { PerfilPersona } from './entities/perfil-persona.entity';
import { AuthModule } from '../auth/auth.module';
import { DominioRepository } from '../dominio/repositories/dominio.repository';
import { AccesoDominoRepository } from './repositories/acceso-dominio.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Persona, PerfilPersona, Credencial, Dominio]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UsuarioController],
  providers: [
    PersonaRepository,
    CredencialRepository,
    DominioRepository,
    AccesoDominoRepository,
    UsuarioService,
  ],
  exports: [
    CredencialRepository,
    DominioRepository,
    AccesoDominoRepository,
    UsuarioService,
  ],
})
export class UsuarioModule {}
