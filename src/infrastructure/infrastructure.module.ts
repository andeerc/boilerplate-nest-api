import { Module } from '@nestjs/common';
import { ConfigurationModule } from './configuration/configuration.module';
import { BullModule } from '@nestjs/bull';
import { ConfigurationService } from './configuration/configuration.service';
import { BullBoardModule } from '@bull-board/nestjs';
import { FastifyAdapter } from '@bull-board/fastify';
import { DatabaseModule } from './database/database.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CqrsModule } from '@nestjs/cqrs';
import { RedisModule } from '@nestjs-modules/ioredis';
import { KnexModule } from 'nestjs-knex';

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule,
    BullModule.forRootAsync({
      inject: [ConfigurationService],
      useFactory: (configService: ConfigurationService) => ({
        redis: {
          host: configService.redisHost,
          port: configService.redisPort,
        },
        defaultJobOptions: {
          removeOnComplete: 100,
          removeOnFail: 100,
          attempts: 10,
          backoff: {
            type: 'fixed',
            delay: 5000,
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
          boardTitle: 'API',
          locale: {
            lng: 'pt-BR',
          }
        }
      },
      route: '/bull',
      adapter: FastifyAdapter,
    }),
    RedisModule.forRootAsync({
      inject: [ConfigurationService],
      useFactory: (configService: ConfigurationService) => ({
        type: 'single',
        url: `redis://${configService.redisHost}:${configService.redisPort}`,
      }),
    }),
    ScheduleModule.forRoot(),
    CqrsModule.forRoot(),
  ],
  exports: [
    ConfigurationModule,
    DatabaseModule,
  ],
})
export class InfrastructureModule { }
