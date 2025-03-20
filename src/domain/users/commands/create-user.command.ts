import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateUserDto } from "../dto/user.dto";
import { DatabaseService } from "@/infrastructure/database/database.service";
import { generateId } from "@/utils/generate-id";

export class CreateUserCommand {
  constructor(public readonly dto: CreateUserDto) { }
}

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand, { id: string }> {
  constructor(
    private readonly databaseService: DatabaseService,
  ) { }


  async execute(command: CreateUserCommand) {
    const user = await this.databaseService.qbWSchema('users')
      .insert({
        ...command,
        id: generateId(),
      })
      .returning('id')
      .then((result) => result[0]);

    return user;
  }
}