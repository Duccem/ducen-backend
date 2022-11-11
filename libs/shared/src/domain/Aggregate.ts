import { Exclude, Expose } from 'class-transformer';
import { DomainEvent } from '../../../adaptors/src/messaging/domain/DomainEvent';
import { Primitives } from './types/Primitives';
import { UuidValueObject } from './ValueObjects/Dominio/Uuid';

export abstract class Aggregate {
  @Exclude()
  private domainEvents: Array<DomainEvent>;
  @Exclude() protected id: UuidValueObject;

  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(data: Primitives<Aggregate>) {
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

  public abstract toPrimitives<T extends Aggregate>(context?: string): Primitives<T>;

  public static toArray<T extends Aggregate>(entities: T[]): Array<Primitives<T>> {
    return entities.map((e) => e.toPrimitives());
  }
}
