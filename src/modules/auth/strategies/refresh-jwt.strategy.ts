import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { ConfigLocalKey } from 'src/modules/config/enum/config-local.enum';
import { IRefreshTokenJwt } from 'src/core';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // El access token se espera en el header Authorization
      passReqToCallback: false, // Permite pasar el request completo al método validate
      ignoreExpiration: false, // Validar que el token no haya expirado
      secretOrKeyProvider: (request, rawJwtToken, done) => {
        // Aquí usamos el secretOrKeyProvider
        try {
          const key = this.config.get(ConfigLocalKey.SECRET_REFRESH_TOKEN);
          done(null, key); // Enviar la clave secreta obtenida de la base de datos
        } catch (error) {
          done(error, null); // Manejo de error en caso de que no se pueda obtener la clave
        }
      },
    });
  }

  async validate(payload: IRefreshTokenJwt) {
    // Aquí puedes hacer lógica adicional si quieres verificar algo más del payload
    console.log('JwtRefreshStrategy', { payload });
    return payload;
  }
}
