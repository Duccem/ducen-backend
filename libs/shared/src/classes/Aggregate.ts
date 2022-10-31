import { Exclude, Expose } from 'class-transformer';
import { JsonDocument } from '../types/JsonDocument';
import { DomainEvent } from './DomainEvent';
import { UuidValueObject } from './ValueObjects/Dominio/Uuid';

export abstract class Aggregate {
  @Exclude()
  private domainEvents: Array<DomainEvent>;
  @Exclude() protected id: UuidValueObject;

  public createdAt: Date;
  public updatedAt: Date;

  constructor(data: JsonDocument<Aggregate>) {
    this.domainEvents = [];
    this.id = data._id ? new UuidValueObject(data._id as string) : UuidValueObject.random();
    this.createdAt = data.createdAt ? data.createdAt : new Date();
    this.updatedAt = data.updatedAt;
  }

  @Expose({ name: '_id' })
  public get _id(): string {
    return this.id.getValue();
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
