import { Controller, Get } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { ClientsService } from "@/domain/clients/clients.service";

@Controller('clients')
@ApiBearerAuth()
export class ClientsController {
  constructor(
    private readonly clientsService: ClientsService,
  ) { }

  @Get()
  findAll() {
    return this.clientsService.findAll();
  }
}
