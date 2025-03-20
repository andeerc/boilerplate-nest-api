import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigurationRepository } from './configuration.repository';

@Injectable()
export class ConfigurationService {
  constructor(
    private readonly configService: ConfigService,
  ) { }

  GetAll() {
    return this.configService['_envConfig'];
  }

  get isDevelopment(): boolean {
    return this.configService.get('NODE_ENV') === 'development';
  }

  get isProduction(): boolean {
    return this.configService.get('NODE_ENV') === 'production';
  }

  get port(): number {
    return this.configService.get<number>('PORT');
  }

  get jwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }

  get jwtExpirationTime(): string {
    return this.configService.get<string>('JWT_EXPIRATION_TIME');
  }

  get cookieSecret(): string {
    return this.configService.get<string>('COOKIE_SECRET');
  }

  get redisHost(): string {
    return this.configService.get<string>('REDIS_HOST');
  }

  get redisPort(): number {
    return this.configService.get<number>('REDIS_PORT');
  }

  get databaseUrl(): string {
    return this.configService.get<string>('DATABASE_URL');
  }
}
