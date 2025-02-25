import { AuthService } from '@/domain/auth/auth.service';
import { Controller, HttpCode, Post } from '@nestjs/common';
import { IsPublic } from '../decorators/is-public.decorator';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from '@/domain/auth/dto/login.dto';
import { LoginResponseDto } from '@/domain/auth/dto/login-response.dto';
import { LoginRefreshDto } from '@/domain/auth/dto/login-refresh.dto';

@Controller('auth')
@IsPublic() // This controller is public
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Login' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  login(loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(loginDto);
  }

  @Post('refresh')
  @HttpCode(200)
  @ApiOperation({ summary: 'Refresh token' })
  @ApiBody({ type: LoginRefreshDto })
  @ApiResponse({
    status: 200,
    description: 'Token refreshed',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  refresh(loginRefreshDto: LoginRefreshDto): Promise<LoginResponseDto> {
    return this.authService.refresh(loginRefreshDto);
  }
}
