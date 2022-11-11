import { Primitives, UuidValueObject } from '@ducen/shared';

export abstract class DomainEvent {
  static EVENT_NAME: string;
  static fromPrimitives: (...args: any[]) => DomainEvent;
  readonly aggregateId: string;
  readonly eventId: string;
  readonly occurredOn: Date;
  readonly eventName: string;

  constructor(eventName: string, aggregateId: string, eventId?: string, occurredOn?: Date) {
    this.aggregateId = aggregateId;
    this.eventId = eventId || UuidValueObject.random().getValue();
    this.occurredOn = occurredOn || new Date();
    this.eventName = eventName;
  }

  public abstract toPrimitive<T>(): Primitives<T>;
}

export type DomainEventClass = { EVENT_NAME: string; fromPrimitives(...args: any[]): DomainEvent };
