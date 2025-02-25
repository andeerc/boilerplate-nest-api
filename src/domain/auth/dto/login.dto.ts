import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
  @ApiProperty({ description: 'Usuário do sistema.' })
  @IsString({
    message: 'Informe um usuário válido.'
  })
  @IsNotEmpty()
  readonly user: string;

  @ApiProperty({ description: 'Senha do usuário.' })
  @IsString({
    message: 'Informe uma senha válida.'
  })
  @IsNotEmpty()
  readonly password: string;
}