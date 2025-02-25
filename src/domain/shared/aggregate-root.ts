import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { BaseEntity } from './base-entity';
import { DomainEvent } from './domain-events/domain-event';
import { Exclude } from 'class-transformer';

export abstract class AggregateRoot extends BaseEntity {
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
    select: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    select: false,
  })
  updatedAt: Date;

  @Exclude()
  private _domainEvents: DomainEvent[] = [];

  set domainEvents(event: DomainEvent | DomainEvent[]) {
    this._domainEvents.push(...(Array.isArray(event) ? event : [event]));
  }

  get domainEvents(): DomainEvent[] {
    return this._domainEvents;
  }
}