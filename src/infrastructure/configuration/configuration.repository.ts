import { BaseRepository } from "@/infrastructure/database/shared/base-repository";
import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { Configuration } from "./entities/configuration.entity";

@Injectable()
export class ConfigurationRepository extends BaseRepository<Configuration> {
  constructor(dataSource: DataSource) {
    super(Configuration, dataSource);
  }
}