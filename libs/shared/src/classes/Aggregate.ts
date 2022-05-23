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

  public abstract toPrimitives<D extends JsonDocument>(context?: string): D;
  public static toArray<T extends Aggregate, D extends JsonDocument>(entities: T[]): Array<D> {
    return entities.map((e) => e.toPrimitives());
  }
}
