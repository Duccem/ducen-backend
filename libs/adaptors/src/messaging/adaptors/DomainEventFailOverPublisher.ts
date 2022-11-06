import { MongoConnection } from '@ducen/adaptors/database/adaptors/Mongo/MongoConnection';
import { Injectable } from '@nestjs/common';
import { Collection } from 'mongodb';
import { DomainEvent } from '../domain/DomainEvent';
import { DomainEventDeserializer } from '../domain/DomainEventDeserializer';
import { DomainEventSerializer } from '../domain/DomainEventSerializer';

@Injectable()
export class DomainEventFailOverPublisher {
  private deserializer: DomainEventDeserializer;
  static collectionName = 'event';
  constructor(private connection: MongoConnection) {}

  private get collection(): Collection {
    return this.connection.getConnection().collection(DomainEventFailOverPublisher.collectionName);
  }

  setDeserializer(deserializer: DomainEventDeserializer) {
    this.deserializer = deserializer;
  }

  async publish(event: DomainEvent) {
    const eventSerialized = DomainEventSerializer.serialize(event);
    await this.collection.updateOne({ eventId: event.eventId }, { $set: { eventId: event.eventId, event: eventSerialized } }, { upsert: true });
  }

  async consume(): Promise<Array<DomainEvent>> {
    const documents = await this.collection.find().limit(200).toArray();
    const events = documents.map((document) => this.deserializer.deserialize(document.event));
    return events.filter(Boolean) as Array<DomainEvent>;
  }
}
