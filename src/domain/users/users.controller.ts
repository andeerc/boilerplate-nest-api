import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { UsersService } from '@/domain/users/users.service';
import { CreateUserDto, UserDto } from '@/domain/users/dto/user.dto';

@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) { }

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Retorna a lista de usuários' })
  @ApiResponse({ status: 200, type: UserDto, isArray: true })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Retorna um usuário' })
  @ApiParam({ name: 'id', required: true, description: 'ID do usuário' })
  @ApiResponse({ status: 200, type: UserDto })
  @ApiResponse({ status: 400, description: 'Usuário não encontrado' })
  findById(@Param('id') id: string) {
    return this.usersService.findFirst({ id });
  }

  @Post(':id')
  @HttpCode(201)
  @ApiOperation({ summary: 'Cria um usuário' })
  @ApiParam({ name: 'id', required: true, description: 'ID do usuário' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, type: UserDto })
  @ApiResponse({ status: 400, description: 'Usuário não encontrado' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
