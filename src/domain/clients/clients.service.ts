import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

@Injectable()
export class ClientsService {
  constructor(
    private readonly commandBus: CommandBus,
  ) { }

  findAll(filters?: any) {
    return []
  }

  getLogs(clientId: string) {
    return []
  }

  async findClient(id: string) {
    const client = {}
    if (!client) {
      throw new BadRequestException('Cliente não encontrado.');
    }

    return client;
  }

  async create(dto: any) {
    const clientExists = false;
    if (clientExists) {
      throw new BadRequestException('Já existe um cliente com esse hash.');
    }

    return {}
  }

  async updateClient(id: string, dto: any) {
    let client = {}
    if (!client) {
      throw new BadRequestException('Cliente não encontrado.');
    }

    return client;
  }
}
