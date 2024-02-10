import { Module } from '@nestjs/common';
import { Email } from './email';
import { EmailService } from './service/email.service';

@Module({
  providers: [Email, EmailService],
})
export class EmailModule {}
