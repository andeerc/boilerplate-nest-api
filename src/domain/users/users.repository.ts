import { SchemaContext } from './../../infrastructure/database/schema-context.service';
import { DatabaseService } from "@/infrastructure/database/database.service";
import { generateId } from "@/utils/generate-id";
import { Injectable } from "@nestjs/common";
import { objectToSnake } from "ts-case-convert";
import { UserDto } from "./dto/user.dto";

export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  metadata: any;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class UsersRepository {
  constructor(
    private readonly schemaContext: SchemaContext,
    private readonly databaseService: DatabaseService,
  ) { }

  async findAll() {
    const users = await this.databaseService.qb('users')
      .select<UserDto[]>()
      .orderBy('created_at', 'desc');

    return users;
  }

  async findOneBy(filter: Partial<User>) {
    const data = await this.databaseService.qb('users')
      .select()
      .where(filter)
      .first<UserDto>();

    return data;
  }

  async update(id: string, data: Partial<User>) {
    await this.databaseService.qb('users')
      .where('id', id)
      .update(data);
  }

  async insert(data: Partial<User>): Promise<{ id: string }> {
    const user = await this.databaseService.qb('users')
      .insert({
        ...objectToSnake(data),
        id: generateId(),
      })
      .returning<UserDto[]>(['id']).first();

    return user;
  }
}