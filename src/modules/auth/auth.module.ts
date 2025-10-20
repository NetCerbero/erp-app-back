import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccesoSesion } from '../usuario/entities/acceso-sesion.entity';
import { AccesoSessionRepository } from '../usuario/repositories/acceso-sesion.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtRefreshStrategy } from './strategies/refresh-jwt.strategy';
import { JwtAccessStrategy } from './strategies/access-jwt.strategy';
import { UsuarioModule } from '../usuario/usuario.module';
import { ConfigLocalModule } from '../config/config-local.module';
import { PermisoModule } from '../permiso/permiso.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AccesoSesion
    ]),
    PassportModule,
    JwtModule,//.register({global:true}),
    ConfigLocalModule,
    forwardRef(() => UsuarioModule),
    PermisoModule
  ],
  controllers: [AuthController],
  providers: [
    AccesoSessionRepository, AuthService,
    JwtAccessStrategy, JwtRefreshStrategy,
   
  ],
  exports: [AuthService]
})
export class AuthModule { }
