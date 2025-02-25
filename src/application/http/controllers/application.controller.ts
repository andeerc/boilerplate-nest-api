import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiProduces, ApiProperty, ApiResponse } from '@nestjs/swagger';
import { IsPublic } from '../decorators/is-public.decorator';

class ApiEntryResponseDto {
  @ApiProperty({ example: 'Api is up and running' })
  message: string;
}

@Controller()
@ApiBearerAuth()
export class ApplicationController {

  constructor() { }

  @Get()
  @IsPublic()
  @HttpCode(200)
  @ApiOperation({ summary: 'Api is up and running' })
  @ApiProduces('application/json')
  @ApiResponse({ status: 200, description: 'Api is up and running', type: ApiEntryResponseDto })
  getHello(): ApiEntryResponseDto {
    return {
      message: 'Api is up and running',
    }
  }
}
