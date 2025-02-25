import { Module } from '@nestjs/common';
import { DomainModule } from '@/domain/domain.module';
import { ApplicationController } from './controllers/application.controller';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
  imports: [
    DomainModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }
  ],
  controllers: [
    ApplicationController
  ],
})
export class HttpModule { }
