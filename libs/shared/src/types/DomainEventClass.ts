import { DomainEvent } from '../classes/DomainEvent';

export type DomainEventClass = {
  EVENT_NAME: string;
  fromPrimitives(...args: any[]): DomainEvent;
};
