import { Global, Module } from "@nestjs/common";
import { DatabaseService } from "./database.service";
import { KnexModule } from "nestjs-knex";
import { ConfigurationService } from "../configuration/configuration.service";
import { DatabaseInfraService } from "./database-infra.service";
import { SchemaContext } from "./schema-context.service";
import { DatabaseEvents } from "./events";
import { BullModule } from "@nestjs/bull";
import { BullBoardModule } from "@bull-board/nestjs";
import { BullAdapter } from "@bull-board/api/bullAdapter";

@Global()
@Module({
  imports: [
    KnexModule.forRootAsync({
      inject: [ConfigurationService],
      useFactory: async (configService: ConfigurationService) => ({
        config: {
          client: 'pg',
          connection: configService.databaseUrl,
          pool: {
            min: 2,
            max: 100,
          },
          migrations: {
            directory: __dirname + '/migrations',
            tableName: 'migrations',
            loadExtensions: ['.js'],
          },
          seeds: {
            directory: __dirname + '/seeds',
            loadExtensions: ['.js'],
          },
        },
      }),
    }),
    BullModule.registerQueue({
      name: 'database',
    }),
    BullBoardModule.forFeature({
      name: 'database',
      adapter: BullAdapter,
    }),
  ],
  providers: [
    SchemaContext,
    DatabaseInfraService,
    DatabaseService,
    ...DatabaseEvents,
  ],
  exports: [
    SchemaContext,
    DatabaseInfraService,
    DatabaseService,
  ],
})
export class DatabaseModule { }