import { MongoRepository } from '@ducen/adaptors/database/adaptors/Mongo/MongoRepository';
import { Nullable } from '@ducen/shared';
import { Notification } from '../../domain/Notification';
import { NotificationRepository } from '../../domain/NotificationRepository';

export class MongoNotificationRepository extends MongoRepository<Notification> implements NotificationRepository {
  async getByUser(userId: string): Promise<Nullable<Notification>> {
    const data = await this.collection.findOne({ user: userId });
    if (!data) return null;
    return new Notification(data);
  }
}
