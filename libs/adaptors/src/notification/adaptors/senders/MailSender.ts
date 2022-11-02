/* eslint-disable @typescript-eslint/no-var-requires */
import { UserRepository } from '@ducen/core';
import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';
import { compile } from 'handlebars';
import { Transporter } from 'nodemailer';
import { join } from 'path';
const nodemailer = require('nodemailer');
export class MailSender {
  private transporter: Transporter;
  constructor(private configService: ConfigService, @Inject('USER_REPOSITORY') private userRepository: UserRepository) {
    this.transporter = nodemailer.createTransport({
      host: configService.get<string>('mail.host'),
      port: configService.get<string>('mail.port'),
      auth: {
        user: configService.get<string>('mail.username'),
        pass: configService.get<string>('mail.password'),
      },
    });
  }

  async SendEmail(userId: string, title: string, templateName: string, data = {}) {
    const user = await this.userRepository.get(userId);
    if (!user) return;

    const source = readFileSync(join(__dirname, `${templateName}.hbs`), 'utf8');
    const template = compile(source);

    const options = {
      from: `Ducen <${this.configService.get<string>('mail.fromEmail')}>`,
      to: user.mail,
      subject: title,
      html: template(data),
    };

    await this.transporter.sendMail(options);
  }
}
