import { MongoRepository } from '@ducen/adaptors/database/adaptors/Mongo/MongoRepository';
import { Device } from '../../domain/Device/Device';
import { DeviceRepository } from '../../domain/Device/DeviceRepository';

export class MongoDeviceRepository extends MongoRepository<Device> implements DeviceRepository {
  async getByUser(userId: string): Promise<Device[]> {
    const data = await this.collection.find({ user: userId }).toArray();
    return data.map((device) => new Device(device));
  }
}
