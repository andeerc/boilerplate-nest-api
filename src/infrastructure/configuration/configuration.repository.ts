import { DatabaseService } from './../database/database.service';
import { Injectable } from "@nestjs/common";

@Injectable()
export class ConfigurationRepository {
  constructor(
    private readonly databaseService: DatabaseService,
  ) { }

  async get(name: string, schema: string = 'public') {
    return this.databaseService.qb('configurations')
      .withSchema(schema)
      .where({ name })
      .first();
  }

  async getAll(schema: string = 'public') {
    return this.databaseService.qb('configurations').withSchema(schema).select();
  }

  async set(name: string, value: any, schema: string = 'public') {
    return this.databaseService.qb('configurations')
      .withSchema(schema)
      .insert({ name, value });
  }

  async update(name: string, value: any, schema: string = 'public') {
    return this.databaseService.qb('configurations')
      .withSchema(schema)
      .where({ name })
      .update({ value });
  }

  async delete(name: string, schema: string = 'public') {
    return this.databaseService.qb('configurations')
      .withSchema(schema)
      .where({ name })
      .delete();
  }
}