import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class AppEventsService implements OnModuleInit {
  private eventSubject = new Subject<any>();
  private subscriber: Redis;

  constructor(
    @InjectRedis() private readonly redis: Redis,
  ) { }

  private async onReceiveApplicationSseEvents(channel: string, message: string) {
    if (!message) {
      return;
    }

    if (channel !== 'application-sse-events') {
      return;
    }

    this.eventSubject.next({ data: message });
  }

  async onModuleInit() {
    this.subscriber = this.redis.duplicate();
    await this.subscriber.subscribe('application-sse-events');
    this.subscriber.on('message', this.onReceiveApplicationSseEvents.bind(this));
  }

  get events$(): Observable<MessageEvent> {
    return this.eventSubject.asObservable();
  }

  async publishEvent(data: any) {
    await this.redis.publish('application-sse-events', JSON.stringify(data));
  }
}

