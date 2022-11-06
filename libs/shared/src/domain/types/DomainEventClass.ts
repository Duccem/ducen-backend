import { DomainEvent } from '../../../../adaptors/src/messaging/domain/DomainEvent';

export type DomainEventClass = {
  EVENT_NAME: string;
  fromPrimitives(...args: any[]): DomainEvent;
};
