import { Injectable, Logger } from "@nestjs/common";
import { InjectKnex, Knex } from "nestjs-knex";

@Injectable()
export class DatabaseInfraService {
  private readonly logger = new Logger('Infrastructure:DatabaseInfraService');

  constructor(
    @InjectKnex() private readonly knex: Knex,
  ) { }

  runMigrations() {
    this.logger.log('Running migrations...');
    return this.knex.migrate.up();
  }

  runSeeds() {
    this.logger.log('Running seeds...');
    return this.knex.seed.run();
  }
}