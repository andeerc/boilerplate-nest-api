import { Module } from '@nestjs/common';
import { DomainModule } from './domain/domain.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { IntegrationsModule } from './integrations/integrations.module';

@Module({
  imports: [
    DomainModule,
    InfrastructureModule,
    IntegrationsModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule { }
