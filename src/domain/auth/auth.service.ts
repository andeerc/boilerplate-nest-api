import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';

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

  async login(dto: LoginDto): Promise<LoginResponseDto> {
    const user = { id: 1, name: 'John Doe', isAdmin: true };
    return await this.generateTokens(user);
  }

  async refresh(refreshToken: string): Promise<LoginResponseDto> {
    const { user } = this.jwtService.verify(refreshToken) as any;
    return await this.generateTokens(user);
  }
}
