import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UserDto } from './dto/user.dto';
import { ServiceBase } from '../shared/service-base';
import { FindUsersQuery } from './queries/find-users.query';
import { CreateUserCommand } from './commands/create-user.command';

@Injectable()
export class UsersService extends ServiceBase {
  constructor() {
    super('users');
  }

  findAll() {
    return this.queryBus.execute<FindUsersQuery, UserDto[]>(
      new FindUsersQuery({}),
    );
  }

  async findFirst(filter: any) {
    const users = await this.queryBus.execute<FindUsersQuery, UserDto[]>(
      new FindUsersQuery(filter),
    );

    if (users.length === 0) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return users[0];
  }

  async create(dto: CreateUserDto) {
    return this.commandBus.execute(new CreateUserCommand(dto));
  }
}
