import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { BullModule } from '@nestjs/bull';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { UsersRepository } from './users.repository';
import { UsersController } from './users.controller';
import { UsersQueries } from './queries';
import { UsersCommands } from './commands';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'users' }),
    BullBoardModule.forFeature({
      name: 'users',
      adapter: BullAdapter
    }),
  ],
  providers: [
    UsersRepository,
    UsersService,
    ...UsersQueries,
    ...UsersCommands,
  ],
  exports: [
    UsersService,
  ],
  controllers: [
    UsersController
  ],
})
export class UsersModule { }
