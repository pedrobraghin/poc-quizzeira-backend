import { Injectable } from '@nestjs/common';

import { SendEmailDTO } from '../dtos';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(
    private configService: ConfigService,
    private mailerService: MailerService,
  ) {}

  async sendEmail({ to, text, subject, html }: SendEmailDTO) {
    await this.mailerService.sendMail({
      to,
      text,
      subject,
      html,
      from: this.configService.get('EMAIL_FROM'),
    });
  }
}
