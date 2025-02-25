import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import { LoginRefreshDto } from './dto/login-refresh.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
  ) { }

  private async generateTokens(user: any): Promise<LoginResponseDto> {
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync({ user }),
      this.jwtService.signAsync({ user_id: user.id }, { expiresIn: '7d' }),
    ]);

    const tokenExpiration = await this.jwtService.verify(accessToken);

    return {
      user,
      accessToken: accessToken,
      accessTokenExpires: tokenExpiration.exp * 1000,
      refreshToken: refreshToken,
    };
  }

  login(dto: LoginDto): Promise<LoginResponseDto> {
    const user = { id: 1, user: dto.user, isAdmin: true }; // This should be a real user from the database
    return this.generateTokens(user);
  }

  refresh(loginRefreshDto: LoginRefreshDto): Promise<LoginResponseDto> {
    const { user } = this.jwtService.verify(loginRefreshDto.refreshToken) as any;
    return this.generateTokens(user);
  }
}
