import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { FastifyRequest } from 'fastify';
import { UserContextService } from '@/domain/shared/contexts/user-context.service';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  constructor(
    private readonly userContextService: UserContextService,
  ) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const user = request["user"];
    this.userContextService.setUser(user);

    return next.handle();
  }
}