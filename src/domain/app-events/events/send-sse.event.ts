import { Job } from "bull";
import { AppEventsService } from "../app-events.service";
import { APP_EVENTS_QUEUE } from "./queues";
import { generateId } from "@/utils/generate-id";
import { Process, Processor } from "@nestjs/bull";

export class SendSseEvent {
  eventId: string;
  occurredOn: Date;

  constructor(
    public readonly event: string,
    public readonly data: any,
  ) {
    this.eventId = generateId();
    this.occurredOn = new Date();
  }
}

@Processor(APP_EVENTS_QUEUE)
export class SseEventsProcessor {
  constructor(
    private readonly appEventsService: AppEventsService,
  ) { }

  @Process('send-sse')
  async sendSseHandler(job: Job<SendSseEvent>) {
    const { data } = job;
    await this.appEventsService.publishEvent(data);
  }
}