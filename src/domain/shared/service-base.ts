import { InjectQueue } from "@nestjs/bull";
import { Inject } from "@nestjs/common";
import { CommandBus, EventBus, QueryBus } from "@nestjs/cqrs";
import { Queue } from "bull";

export class ServiceBase {
  @Inject(QueryBus)
  readonly queryBus: QueryBus;

  @Inject(CommandBus)
  readonly commandBus: CommandBus;

  @Inject(EventBus)
  readonly eventBus: EventBus;

  @InjectQueue()
  readonly queue: Queue;

  constructor(queueBase?: string) {
    this.queue.name = queueBase;
  }

}