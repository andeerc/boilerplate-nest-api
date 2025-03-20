import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsEmail, IsObject, IsString } from "class-validator";
import { User } from "knex/types/tables";

export class CreateUserDto {

  @IsString({ message: 'Nome de usuário inválido.' })
  @ApiProperty()
  name: string;

  @IsEmail(null, { message: 'Email inválido.' })
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  password: string;

  @IsObject()
  @ApiProperty()
  metadata: Record<string, any>;
}

export class UpdateUserDto extends CreateUserDto { }

export class UserDto extends CreateUserDto implements User {
  @ApiProperty()
  id: string;

  @Exclude()
  password: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}