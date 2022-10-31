import { DomainEvent } from '@ducen/shared';

export class ProfileCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'profile.created';
  readonly name: string;
  readonly entities: string[];

  constructor(body: { _id: string; name: string; entities: string[] }, eventId?: string, ocurredOn?: Date) {
    super(ProfileCreatedDomainEvent.EVENT_NAME, body._id, eventId, ocurredOn);
    this.name = body.name;
    this.entities = body.entities;
  }

  public toPrimitive(): { _id: string; name: string; entities: string[] } {
    return {
      _id: this.entityId,
      name: this.name,
      entities: this.entities,
    };
  }

  public static fromPrimitives(object: any): ProfileCreatedDomainEvent {
    return new ProfileCreatedDomainEvent(object);
  }
}
