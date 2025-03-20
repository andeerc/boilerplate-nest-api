import { SchemaContext } from './schema-context.service';
import { Injectable, Scope } from "@nestjs/common";
import { Knex } from "knex";
import { InjectKnex } from "nestjs-knex";
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { UserContextService } from '@/domain/shared/contexts/user-context.service';
import { LogEvent } from './events/create-log.event';
import { Tables } from 'knex/types/tables';

export type DispatchLogProps = {
  recId: string;
  action: 'create' | 'update' | 'delete';
  originalData: any;
  newData: any;
  tableName: string;
  schema?: string;
}

export type Filter = {
  [key: string]: any;
}

@Injectable({
  scope: Scope.REQUEST,
})
export class DatabaseService {
  constructor(
    @InjectKnex() private readonly _knex: Knex,
    @InjectQueue('database') private readonly queue: Queue,
    private readonly schemaContext: SchemaContext,
    private readonly userContextService: UserContextService,
  ) { }

  qb(table?: keyof Tables) {
    return this._knex(table);
  }

  qbWSchema(table?: keyof Tables) {
    const schema = this.schemaContext.getSchema();
    return this._knex(table).withSchema(schema)
  }

  get knex() {
    return this._knex;
  }

  applyFilter(filter: any, table: keyof Tables) {
    const qb = this.qbWSchema(table);
    applyDynamicFilter(qb, filter);
    return qb;
  }

  async dispatchLog(props: DispatchLogProps) {
    const user = {
      id: 'SYSTEMA',
      name: 'Sistema',
      email: 'sistema@sistema.com',
    };

    if (this.userContextService.user) {
      user.id = this.userContextService.user.id;
      user.name = this.userContextService.user.name;
      user.email = this.userContextService.user.email;
    }

    const createLog = new LogEvent({
      recId: props.recId,
      action: props.action,
      originalData: props.originalData,
      newData: props.newData,
      tableName: props.tableName,
      schema: props.schema ?? this.schemaContext.getSchema(),
      user,
    });

    await this.queue.add('create-log', createLog);
  }
}


// Mapeamento dos operadores para os operadores SQL
function mapOperator(op: string): string {
  switch (op) {
    case 'eq': return '=';
    case 'ne': return '!=';
    case 'gt': return '>';
    case 'gte': return '>=';
    case 'lt': return '<';
    case 'lte': return '<=';
    case 'like': return 'like';
    default: throw new Error(`Operador inválido: ${op}`);
  }
}

/**
 * Aplica dinamicamente o filtro (possivelmente aninhado) no query builder.
 * O objeto filter pode ter:
 * - chaves lógicas: "or" e "and", cujos valores são arrays de filtros
 * - ou ser um objeto com chaves representando campos e seus operadores
 */
function applyDynamicFilter(queryBuilder: Knex.QueryBuilder, filter: any): void {
  if (typeof filter !== 'object' || filter === null) return;

  // Se o filtro possui chave "or"
  if (filter.or && Array.isArray(filter.or)) {
    queryBuilder.where(function () {
      filter.or.forEach((subFilter: any) => {
        this.orWhere(() => {
          applyDynamicFilter(this, subFilter);
        });
      });
    });
    return;
  }

  // Se o filtro possui chave "and"
  if (filter.and && Array.isArray(filter.and)) {
    queryBuilder.where(function () {
      filter.and.forEach((subFilter: any) => {
        this.andWhere(function () {
          applyDynamicFilter(this, subFilter);
        });
      });
    });
    return;
  }

  // Caso o objeto seja um conjunto de condições, ex:
  // { "id": { "eq": 1 }, "name": { "like": "Abc" } }
  Object.entries(filter).forEach(([field, condition]) => {
    // Cada condition pode ter mais de um operador (será considerado um AND entre eles)
    if (typeof condition === 'object' && condition !== null) {
      Object.entries(condition).forEach(([op, value]) => {
        // Aplica a condição no query builder
        queryBuilder.andWhere(field, mapOperator(op), value);
      });
    }
  });
}