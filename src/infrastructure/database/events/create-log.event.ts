import { generateId } from "@/utils/generate-id";
import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import * as moment from "moment";
import { InjectKnex, Knex } from "nestjs-knex";

export type LogProps = {
  recId: string;
  action: string;
  originalData: any;
  newData: any;
  tableName: string;
  schema: string;
  user: {
    id: string;
    name: string;
    email: string;
  }
}

export class LogEvent {
  recId: string;
  action: string;
  originalData: any;
  newData: any;
  tableName: string;
  schema: string;
  user: { id: string, name: string, email: string };
  date: Date;

  constructor(props: LogProps) {
    this.recId = props.recId;
    this.action = props.action;
    this.originalData = props.originalData;
    this.newData = props.newData;
    this.tableName = props.tableName;
    this.schema = props.schema;
    this.user = props.user;
    this.date = moment().utc().toDate();
  }
}

@Processor('database')
export class CreateLogEvent {
  constructor(
    @InjectKnex() private readonly knex: Knex,
  ) { }

  @Process('create-log')
  async createLog(job: Job<LogEvent>) {
    const log = job.data;
    const dataDiff = this.diff(log.originalData, log.newData);

    const existsLog = await this.knex(`${log.schema}.${log.tableName}_log`)
      .select<{ id: string, metadata: Record<string, any>[] }>('id', 'metadata')
      .where('rec_id', log.recId)
      .first();

    const metadata = existsLog ? existsLog.metadata : [];
    metadata.push({
      action: log.action,
      user: log.user,
      date: log.date,
      diff: dataDiff,
    });

    if (existsLog) {
      await this.knex(`${log.schema}.${log.tableName}_log`)
        .where('id', existsLog.id)
        .update({ metadata: JSON.stringify(metadata) });
      return;
    } else {
      await this.knex(`${log.schema}.${log.tableName}_log`)
        .insert({
          id: generateId(),
          rec_id: log.recId,
          metadata: JSON.stringify(metadata),
        });
    }
  }

  private diff(originalData: any, newData: any): any {
    const diff = {};

    // Se o objeto original estiver vazio, retorna o novo objeto
    if (Object.keys(originalData).length === 0) {
      return newData;
    }

    for (const key in originalData) {
      if (typeof originalData[key] === 'object' && originalData[key] !== null) {
        const nestedDiff = this.diff(originalData[key], newData[key]);
        // Só atribui se houver diferenças no objeto aninhado
        if (Object.keys(nestedDiff).length > 0) {
          diff[key] = nestedDiff;
        }
        continue;
      }

      if (originalData[key] !== newData[key]) {
        diff[key] = {
          old: originalData[key],
          new: newData[key],
        };
      }
    }

    return diff;
  }

}