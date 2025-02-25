import { Module } from '@nestjs/common';
import { DomainModule } from '@/domain/domain.module';
import { ApplicationController } from './controllers/application.controller';

@Module({
  imports: [
    DomainModule,
  ],
  providers: [
  ],
  controllers: [
    ApplicationController
  ],
})
export class HttpModule { }
