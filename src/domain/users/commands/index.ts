import { CreateUserCommandHandler } from "./create-user.command";
import { DeleteUserCommandHandler } from "./delete-user.command";
import { UpdateUserCommandHandler } from "./update-user.command";

export const UsersCommands = [
  CreateUserCommandHandler,
  UpdateUserCommandHandler,
  DeleteUserCommandHandler,
]