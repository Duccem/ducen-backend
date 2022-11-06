import { DomainEvent } from '@ducen/shared';

type ProfileCreatedDomainEventAttributes = {
  readonly name: string;
  readonly entities: string[];
};
export class ProfileCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'profile.created';
  readonly name: string;
  readonly entities: string[];

  constructor({
    aggregateId,
    eventId,
    entities,
    name,
    occurredOn,
  }: {
    aggregateId: string;
    eventId?: string;
    entities: string[];
    name: string;
    occurredOn?: Date;
  }) {
    super(ProfileCreatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn);
    this.name = name;
    this.entities = entities;
  }

  public toPrimitive(): ProfileCreatedDomainEventAttributes {
    return {
      name: this.name,
      entities: this.entities,
    };
  }

  public static fromPrimitives(params: {
    aggregateId: string;
    attributes: ProfileCreatedDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): ProfileCreatedDomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new ProfileCreatedDomainEvent({
      aggregateId,
      occurredOn,
      eventId,
      name: attributes.name,
      entities: attributes.entities,
    });
  }
}
