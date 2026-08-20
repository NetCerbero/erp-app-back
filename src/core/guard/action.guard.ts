import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ACTION_KEY, IS_PUBLIC_KEY } from '../decorator';
import { ACCION } from '../enum';
import { IAuth, IAuthTokenJwt } from '../interface';

@Injectable()
export class ActionGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const actions = this.reflector.getAllAndOverride<ACCION[]>(ACTION_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;
    const { user }: { user: IAuth } = context.switchToHttp().getRequest();
    return actions?.length > 0 ? actions?.some((action) => user?.permisos?.get(action)) : true;
  }
}
