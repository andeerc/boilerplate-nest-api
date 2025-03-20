import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [UsersModule],
  providers: [
    AuthService,
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule { }
