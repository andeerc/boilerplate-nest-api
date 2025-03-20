import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateUserDto } from "../dto/user.dto";
import { DatabaseService } from "@/infrastructure/database/database.service";

export class UpdateUserCommand {
  constructor(
    public readonly id: string,
    public readonly dto: UpdateUserDto,
  ) { }
}

@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler implements ICommandHandler<UpdateUserCommand, void> {
  constructor(
    private readonly databaseService: DatabaseService,
  ) { }


  async execute(command: UpdateUserCommand) {
    await this.databaseService.qbWSchema('users')
      .update({
        ...command,
      })
      .where('id', command.id);
  }
}