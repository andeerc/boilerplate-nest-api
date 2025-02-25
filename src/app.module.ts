import { Module } from '@nestjs/common';
import { ApplicationModule } from './application/application.module';
import { DomainModule } from './domain/domain.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { IntegrationsModule } from './integrations/integrations.module';

@Module({
  imports: [
    ApplicationModule,
    DomainModule,
    InfrastructureModule,
    IntegrationsModule,
  ],
})
export class AppModule { }
