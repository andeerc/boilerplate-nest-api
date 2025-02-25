import { Global, Module } from "@nestjs/common";
import { DatabaseService } from "./database.service";
@Global()
@Module({
  imports: [],
  providers: [DatabaseService],
  exports: [DatabaseService],
  controllers: [],
})
export class DatabaseModule {
}