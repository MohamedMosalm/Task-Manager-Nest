import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface UserPayload {
  sub: number;
  username: string;
}

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserPayload => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as UserPayload;
  },
);
