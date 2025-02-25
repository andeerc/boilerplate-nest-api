import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { BullModule } from '@nestjs/bull';
import { BullBoardModule } from '@bull-board/nestjs';
import { FastifyAdapter } from '@bull-board/fastify';
import { ScheduleModule } from '@nestjs/schedule';
import { CqrsModule } from '@nestjs/cqrs';
import * as Joi from 'joi';
import typeorm from './database/config/typeorm';
import { DatabaseModule } from './database/database.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { ConfigurationService } from './configuration/configuration.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('typeorm')),
    }),
    DatabaseModule,

    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('development'),
        URL: Joi.string().default('http://localhost:3001'),
        PORT: Joi.number().default(3001),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().default('4h'),
        COOKIE_SECRET: Joi.string().required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
        REDIS_USERNAME: Joi.string().required(),
        REDIS_PASSWORD: Joi.string().required(),
        DATABASE_URL: Joi.string().required(),
      }),
    }),
    ConfigurationModule,
    JwtModule.registerAsync({
      inject: [ConfigurationService],
      useFactory: (configService: ConfigurationService) => ({
        secret: configService.jwtSecret,
        signOptions: { expiresIn: configService.jwtExpirationTime },
      }),
      global: true,
    }),
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
    ScheduleModule.forRoot(),
    CqrsModule.forRoot(),
  ],

})
export class InfrastructureModule { }
