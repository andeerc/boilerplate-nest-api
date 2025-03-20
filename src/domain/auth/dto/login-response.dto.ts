import { ApiProperty } from "@nestjs/swagger";

class LoginResponseUserDto {
  @ApiProperty({ description: 'ID do usuário' })
  id: string;

  @ApiProperty({ description: 'E-mail do usuário' })
  email: string;

  @ApiProperty({ description: 'Nome do usuário' })
  name: string;
}

export class LoginResponseDto {
  @ApiProperty({ description: 'Token de acesso' })
  accessToken: string;

  @ApiProperty({ description: 'Data de expiração do token de acesso' })
  accessTokenExpires: number;

  @ApiProperty({ description: 'Token de atualização' })
  refreshToken: string;

  @ApiProperty({ description: 'Usuário logado' })
  user: LoginResponseUserDto;
}