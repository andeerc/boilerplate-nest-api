import { Injectable } from "@nestjs/common";
import { ConfigurationRepository } from "./configuration.repository";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ConfigurationDBService {
  constructor(
    private readonly configurationRepository: ConfigurationRepository,
    private readonly configService: ConfigService,
  ) { }

  async getAll() {
    return this.configurationRepository.getAll();
  }

  async get<T = unknown>(name: string): Promise<T> {
    const configuration = await this.configurationRepository.get(name);
    return configuration ? configuration.value as T : this.configService.get(name);
  }

  async set(name: string, value: any, updateIfExists = true) {
    const hasConfiguration = await this.configurationRepository.get(name);
    if (hasConfiguration) {
      if (!updateIfExists) {
        return;
      }

      await this.configurationRepository.update(name, value);
    }

    await this.configurationRepository.set(name, value);
  }

  async delete(name: string) {
    await this.configurationRepository.delete(name);
  }

  async hasFeatureFlag(name: string): Promise<boolean> {
    const configuration = await this.configurationRepository.get(name);
    return configuration ? configuration.value : this.configService.get(name);
  }
}