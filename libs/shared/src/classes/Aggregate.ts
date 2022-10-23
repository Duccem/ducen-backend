import { Exclude } from 'class-transformer';
import { JsonDocument } from '../types/JsonDocument';
import { DomainEvent } from './DomainEvent';

export abstract class Aggregate {
  @Exclude()
  private domainEvents: Array<DomainEvent>;

  constructor() {
    this.domainEvents = [];
  }

  public pullDomainEvents(): Array<DomainEvent> {
    return this.domainEvents;
  }

  public record(event: DomainEvent): void {
    this.domainEvents.push(event);
  }

  public abstract toPrimitives<T extends Aggregate>(context?: string): JsonDocument<T>;

  public static toArray<T extends Aggregate>(entities: T[]): Array<JsonDocument<T>> {
    return entities.map((e) => e.toPrimitives());
  }
}
