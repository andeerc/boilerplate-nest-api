import { ApiProperty } from "@nestjs/swagger";

class LoginResponseUserDto {
  @ApiProperty({ description: 'ID do usuário' })
  id: string;

  @ApiProperty({ description: 'Login do usuário' })
  name: string;

  @ApiProperty({ description: 'Flag de administrador' })
  isAdmin: boolean;
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