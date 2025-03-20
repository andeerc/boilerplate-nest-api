import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
  @ApiProperty({ description: 'E-mail do Usuário' })
  @IsEmail({}, {
    message: 'Informe um e-mail válido.'
  })
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ description: 'Senha do Usuário' })
  @IsString({
    message: 'Informe uma senha válida.'
  })
  @IsNotEmpty()
  readonly password: string;
}