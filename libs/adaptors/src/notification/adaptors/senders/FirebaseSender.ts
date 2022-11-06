import { UserRepository } from '@ducen/core';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { app } from 'firebase-admin';
import { DeviceRepository } from '../../domain/Device/DeviceRepository';
import { Notification } from '../../domain/Notification';
import { NotificationRepository } from '../../domain/NotificationRepository';
import { NotificationType } from '../../domain/NotificationType';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const admin = require('firebase-admin');

@Injectable()
export class FirebaseSender {
  private firebaseApp: app.App;
  constructor(
    private configService: ConfigService,
    @Inject('USER_REPOSITORY') private userRepository: UserRepository,
    @Inject('NOTIFICATION_REPOSITORY') private notificationRepository: NotificationRepository,
    @Inject('DEVICE_REPOSITORY') private deviceRepository: DeviceRepository,
  ) {
    const serviceAccount = this.configService.get('firebase.serviceAccount');
    this.firebaseApp = admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(serviceAccount)),
    });
  }

  async SendPushNotification(userId: string, title: string, body: string, data = {}, actionUrl = '') {
    const user = await this.userRepository.get(userId);
    if (!user) return;

    const devices = await this.deviceRepository.getByUser(userId);
    const notification = new Notification({
      body,
      title,
      data,
      user: userId,
      devices: devices.map((device) => device._id),
      type: NotificationType.PUSH,
    });
    const tokens = devices.map((device) => device.token);
    await this.notificationRepository.insert(notification);
    await this.firebaseApp.messaging().sendToDevice(tokens, {
      notification: {
        title,
        body,
        clickAction: actionUrl,
      },
      data,
    });
  }
}
