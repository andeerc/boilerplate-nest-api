import { Global, Module } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { ConfigurationRepository } from './configuration.repository';
import { ConfigurationDBService } from './configuration-db.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
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
        REDIS_PORT: Joi.required(),
        DATABASE_URL: Joi.string().required(),
      }),
    }),

    JwtModule.registerAsync({
      inject: [ConfigurationService],
      useFactory: (configService: ConfigurationService) => ({
        secret: configService.jwtSecret,
        signOptions: { expiresIn: configService.jwtExpirationTime },
      }),
      global: true,
    }),
  ],
  providers: [
    ConfigurationRepository,
    ConfigurationDBService,
    ConfigurationService,
  ],
  exports: [
    ConfigurationDBService,
    ConfigurationService,
  ],
})
export class ConfigurationModule { }
