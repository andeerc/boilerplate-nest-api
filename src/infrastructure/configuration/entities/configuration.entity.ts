import { AggregateRoot } from "@/domain/shared/aggregate-root";
import { Column, Entity } from "typeorm";

@Entity({ name: 'configurations' })
export class Configuration extends AggregateRoot {
  @Column()
  name: string;

  @Column({ type: 'jsonb' })
  value: any;
}