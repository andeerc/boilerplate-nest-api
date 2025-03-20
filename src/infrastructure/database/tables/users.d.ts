import { ApiProperty } from '@nestjs/swagger';
import { Knex } from 'knex';

declare module 'knex/types/tables' {
  interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    metadata: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
  }
}