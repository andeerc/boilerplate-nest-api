import { createParamDecorator, ExecutionContext } from "@nestjs/common";

/**
 * This decorator is used to get the user from the request
 */
export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
})