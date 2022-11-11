import { Aggregate, Primitives } from '@ducen/shared';
import { instanceToPlain } from 'class-transformer';
import { NotificationType } from './NotificationType';

export class Notification extends Aggregate {
  public user: string;
  public title: string;
  public body: string;
  public data: object;
  public type: NotificationType;

  public devices?: string[];

  constructor(data: Primitives<Notification>) {
    super(data);
    this.user = data.user;
    this.title = data.title;
    this.body = data.body;
    this.data = data.data;
    this.type = data.type;
    this.devices = data.devices;
  }
  public toPrimitives(context?: string): Primitives<Notification> {
    return <Primitives<Notification>>instanceToPlain(this, { groups: [context] });
  }
}
