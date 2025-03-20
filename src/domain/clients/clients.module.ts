import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { BullModule } from '@nestjs/bull';
import { HttpModule } from '@nestjs/axios';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ClientsService } from './clients.service';
import { ClientsCommands } from './commands';
import { ClientEvents } from './queues';
import { QUEUE_EXAMPLE } from './queues/queues.constants';
import { ClientsController } from './clients.controller';

@Module({
  imports: [
    CqrsModule,
    BullModule.registerQueue({
      name: QUEUE_EXAMPLE,
      limiter: {
        max: 40,
        duration: 60000,
      },
    }),
    BullBoardModule.forFeature({
      name: QUEUE_EXAMPLE,
      adapter: BullAdapter,
    }),
    HttpModule,
  ],
  providers: [
    ClientsService,
    ...ClientsCommands,
    ...ClientEvents,
  ],
  exports: [ClientsService],
  controllers: [
    ClientsController,
  ]
})
export class ClientsModule { }
