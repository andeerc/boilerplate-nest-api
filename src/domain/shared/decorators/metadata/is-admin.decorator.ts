import { SetMetadata } from "@nestjs/common";

export type IsAdminDecoratorProps = { admin?: boolean, groups?: string[], roles?: string[] };
export const IS_ADMIN_KEY = 'isAdmin';

/**
 * This decorator is used to check if the user is an admin or has the specified groups or roles
 */
export const IsAdmin = (props: IsAdminDecoratorProps = { admin: true }) => SetMetadata(IS_ADMIN_KEY, props);