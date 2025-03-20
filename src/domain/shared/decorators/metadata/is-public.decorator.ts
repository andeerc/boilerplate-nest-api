import { SetMetadata } from "@nestjs/common";

export const IS_PUBLIC_KEY = 'isPublic';

/**
 * This decorator is used to ignore the authentication in the route
 */
export const IsPublic = () => SetMetadata(IS_PUBLIC_KEY, true);