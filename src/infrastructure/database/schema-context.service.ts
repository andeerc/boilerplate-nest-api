import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class SchemaContext {
  private schema: string;

  setSchema(schema: string) {
    this.schema = schema;
  }

  getSchema() {
    return this.schema;
  }
}