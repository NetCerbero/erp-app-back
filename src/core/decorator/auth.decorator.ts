import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IAuth } from '../interface';

export const Auth = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const user = ctx.switchToHttp().getRequest().user;
    return user;
  },
);
