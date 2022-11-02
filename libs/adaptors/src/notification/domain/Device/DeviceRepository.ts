import { Repository } from '@ducen/adaptors/database/domain/Repository';
import { Device } from './Device';

export interface DeviceRepository extends Repository<Device> {
  getByUser(userId: string): Promise<Array<Device>>;
}
