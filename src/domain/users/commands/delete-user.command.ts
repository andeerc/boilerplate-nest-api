import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateUserDto } from "../dto/user.dto";
import { DatabaseService } from "@/infrastructure/database/database.service";

export class DeleteUserCommand {
  constructor(
    public readonly id: string,
  ) { }
}

@CommandHandler(DeleteUserCommand)
export class DeleteUserCommandHandler implements ICommandHandler<DeleteUserCommand, void> {
  constructor(
    private readonly databaseService: DatabaseService,
  ) { }


  async execute(command: DeleteUserCommand) {
    await this.databaseService.qbWSchema('users')
      .delete()
      .where('id', command.id);
  }
}