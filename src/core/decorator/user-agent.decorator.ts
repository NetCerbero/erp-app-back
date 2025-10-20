import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const UserAgent = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
      const useragent = ctx.switchToHttp().getRequest().headers['user-agent'];
      return useragent;
    },
  );