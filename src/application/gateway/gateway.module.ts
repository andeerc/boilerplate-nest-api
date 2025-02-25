import { Module } from '@nestjs/common';
import { AdminGateway } from './sockets/admin.gateway';

@Module({
  providers: [
    AdminGateway,
  ],
})
export class GatewayModule { }
