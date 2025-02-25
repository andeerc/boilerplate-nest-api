import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigurationRepository } from './configuration.repository';

@Injectable()
export class ConfigurationService implements OnModuleInit {
  constructor(
    private readonly configService: ConfigService,
    private readonly repo: ConfigurationRepository,
  ) { }

  async onModuleInit() { }

  async get<T = unknown>(name: string): Promise<T> {
    const configuration = await this.repo.findOne({ where: { name } });
    return configuration ? configuration.value as T : this.configService.get(name);
  }

  async set(name: string, value: any, updateIfExists = true) {
    const hasConfiguration = await this.repo.findOne({ where: { name } });
    if (hasConfiguration) {
      if (!updateIfExists) {
        return;
      }

      await this.repo.update({ name }, { value });
    }

    await this.repo.save(
      this.repo.create({ name, value })
    );
  }

  async delete(name: string) {
    const configuration = await this.repo.findOne({ where: { name } });
    if (configuration) {
      await this.repo.delete({ name });
    }
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

  get redisUsername(): string {
    return this.configService.get<string>('REDIS_USERNAME');
  }

  get redisPassword(): string {
    return this.configService.get<string>('REDIS_PASSWORD');
  }

  get databaseUrl(): string {
    return this.configService.get<string>('DATABASE_URL');
  }
}
