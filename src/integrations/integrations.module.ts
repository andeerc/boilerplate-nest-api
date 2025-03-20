import { Module } from '@nestjs/common';
import { RedmineModule } from './redmine/redmine.module';

@Module({
  imports: [
    RedmineModule,
  ],
  exports: [
    RedmineModule,
  ],
})
export class IntegrationsModule { }
