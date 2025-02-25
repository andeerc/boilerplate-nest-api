import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule } from '@nestjs/bull';
import { Global, Module } from '@nestjs/common';
import { ConfigurationService } from '../configuration/configuration.service';
import { FastifyAdapter } from '@bull-board/fastify';
import { BullAdapter } from '@bull-board/api/bullAdapter';

@Global()
@Module({
  imports: [
    BullModule.forRootAsync({
      inject: [ConfigurationService],
      useFactory: (configService: ConfigurationService) => ({
        redis: {
          host: configService.redisHost,
          port: configService.redisPort,
          username: configService.redisUsername,
          password: configService.redisPassword
        },
        defaultJobOptions: {
          removeOnComplete: 100,
          removeOnFail: 100,
          attempts: 10,
          backoff: {
            type: 'fixed',
            delay: 1000,
          },
        },
        metrics: {
          maxDataPoints: 500,
        },
      }),
    }),
    BullBoardModule.forRoot({
      boardOptions: {
        uiConfig: {
          boardTitle: 'API Jobs',
          pollingInterval: {
            forceInterval: 5000,
            showSetting: true,
          },
          locale: {
            lng: 'pt-BR',
          }
        }
      },
      route: '/bull',
      adapter: FastifyAdapter,
    }),

    // Register your queues here
    BullModule.registerQueue({ name: 'queueName' }),
    BullBoardModule.forFeature({
      name: 'queueName',
      adapter: BullAdapter,
    }),
  ],
})
export class QueueModule { }
