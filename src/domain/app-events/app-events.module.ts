import { Module } from '@nestjs/common';
import { AppEventsService } from './app-events.service';
import { AppEventEvents } from './events';
import { BullModule } from '@nestjs/bull';
import { BullBoardModule } from '@bull-board/nestjs';
import { APP_EVENTS_QUEUE } from './events/queues';
import { BullAdapter } from '@bull-board/api/bullAdapter';

@Module({
  imports: [
    BullModule.registerQueue({
      name: APP_EVENTS_QUEUE,
    }),
    BullBoardModule.forFeature({
      name: APP_EVENTS_QUEUE,
      adapter: BullAdapter,
    }),
  ],
  providers: [
    AppEventsService,
    ...AppEventEvents
  ],
  exports: [AppEventsService],
})
export class AppEventsModule { }
