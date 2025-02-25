import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateConfigurationsTable1739985603240 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.query(`
      CREATE TABLE configurations (
        id bigint primary key,
        name varchar NOT NULL,
        value jsonb NOT NULL,
        created_at timestamp with time zone DEFAULT now(),
        updated_at timestamp with time zone DEFAULT now()
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.query(`
      DROP TABLE configurations;
    `);
  }

}
