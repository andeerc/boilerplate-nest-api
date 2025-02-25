import { Module } from '@nestjs/common';
import { HttpModule } from './http/http.module';
import { GatewayModule } from './gateway/gateway.module';
import { CronjobsModule } from './cronjobs/cronjobs.module';

@Module({
  imports: [
    CronjobsModule,
    GatewayModule,
    HttpModule,
  ],
  providers: [],
  controllers: [],
})
export class ApplicationModule { }
