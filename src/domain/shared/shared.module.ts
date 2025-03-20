import { Global, Module, Scope } from "@nestjs/common";
import { ContextsModule } from "./contexts/context.module";
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { SchemaInterceptor } from "./interceptors/schema.interceptor";
import { UserInterceptor } from "./interceptors/user.interceptor";

@Global()
@Module({
  imports: [ContextsModule],
  exports: [ContextsModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_INTERCEPTOR,
      scope: Scope.REQUEST,
      useClass: SchemaInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      scope: Scope.REQUEST,
      useClass: UserInterceptor,
    },
  ],
})
export class SharedModule { }