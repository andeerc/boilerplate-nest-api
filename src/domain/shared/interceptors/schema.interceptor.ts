import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { SchemaContext } from '../../../infrastructure/database/schema-context.service';
import { FastifyRequest } from 'fastify';
import { Reflector } from '@nestjs/core';

@Injectable()
export class SchemaInterceptor implements NestInterceptor {
  constructor(
    private readonly schemaContext: SchemaContext,
    private readonly reflector: Reflector,
  ) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const ambient = request.query['ambient'];

    if (!ambient) {
      throw new BadRequestException('Ambient is required');
    }

    this.schemaContext.setSchema(ambient);

    return next.handle();
  }
}