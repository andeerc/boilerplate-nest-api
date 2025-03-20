import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from './clients/clients.module';
import { AppEventsModule } from './app-events/app-events.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ClientsModule,
    AppEventsModule,
    SharedModule,
  ],
  controllers: [],
  providers: [],
  exports: [
    UsersModule,
    AuthModule,
    ClientsModule,
    AppEventsModule,
    SharedModule,
  ],
})
export class DomainModule { }
