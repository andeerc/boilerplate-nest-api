import { Global, Module } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Configuration } from './entities/configuration.entity';
import { ConfigurationRepository } from './configuration.repository';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Configuration]),
  ],
  providers: [
    ConfigurationRepository,
    ConfigurationService,
  ],
  exports: [ConfigurationService],
})
export class ConfigurationModule { }
