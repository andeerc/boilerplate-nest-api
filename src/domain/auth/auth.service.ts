import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { UserDto } from '../users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) { }

  private async generateTokens(user: UserDto): Promise<LoginResponseDto> {
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
    const user = await this.usersService.authenticate(dto);
    return await this.generateTokens(user);
  }

  async refresh(refreshToken: string): Promise<LoginResponseDto> {
    try {
      const { user_id } = this.jwtService.verify(refreshToken) as any;
      const user = await this.usersService.findById(user_id);
      return await this.generateTokens(user);
    } catch (error) {
      throw new BadRequestException('Invalid refresh token');
    }
  }
}
