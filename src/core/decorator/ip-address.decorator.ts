import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const IpAddress = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const ip = request.headers['x-forwarded-for'] || request.socket.remoteAddress;
    return ip;
  },
);
