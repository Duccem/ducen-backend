import { JsonDocument } from '../types/JsonDocument';
import { UuidValueObject } from './ValueObjects/uuid.vo';

export abstract class DomainEvent {
  static EVENT_NAME: string;
  static fromPrimitives: (...args: any[]) => DomainEvent;
  readonly entityId: string;
  readonly eventId: string;
  readonly occurredOn: Date;
  readonly eventName: string;

  constructor(eventName: string, entityId: string, eventId?: string, occurredOn?: Date) {
    this.entityId = entityId;
    this.eventId = eventId || UuidValueObject.random().getValue();
    this.occurredOn = occurredOn || new Date();
    this.eventName = eventName;
  }

  public abstract toPrimitive<T extends JsonDocument>(): T;
}
