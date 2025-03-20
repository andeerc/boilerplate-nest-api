import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from '@/domain/auth/auth.service';
import { LoginDto } from '@/domain/auth/dto/login.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginResponseDto } from '@/domain/auth/dto/login-response.dto';
import { LoginRefreshDto } from '@/domain/auth/dto/login-refresh.dto';
import { IsPublic } from '../shared/decorators/metadata/is-public.decorator';

@Controller('auth')
@IsPublic()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Realiza o login de um usuário' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, type: LoginResponseDto })
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Post('refresh')
  @HttpCode(200)
  @ApiOperation({ summary: 'Atualiza o token de acesso' })
  @ApiBody({ type: LoginRefreshDto })
  @ApiResponse({ status: 200, type: LoginResponseDto })
  refresh(@Body() body: LoginRefreshDto) {
    return this.authService.refresh(body.refreshToken);
  }

}
