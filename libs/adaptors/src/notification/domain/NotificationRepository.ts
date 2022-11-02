import { Repository } from '@ducen/adaptors/database/domain/Repository';
import { Nullable } from '@ducen/shared';
import { Notification } from './Notification';

export interface NotificationRepository extends Repository<Notification> {
  getByUser(userId: string): Promise<Nullable<Notification>>;
}
