import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class ApplicationController {

  constructor(
  ) { }

  @Get()
  @ApiOperation({ summary: 'Api is up and running' })
  getHello() {
    return {
      message: 'Api is up and running',
    }
  }

}
