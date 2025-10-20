import { ConflictException, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { MSG } from '../constant';

export const Authorization = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    // Validamos que exista el header y que empiece con "Bearer "
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.split(' ')[1];  // Devolvemos solo el token
    }
    throw new ConflictException(MSG.NOT_AUTHORIZATION)
  },
);
