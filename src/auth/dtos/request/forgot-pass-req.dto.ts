import { IsEmail } from 'class-validator';

export class ForgotPassReqDTO {
  @IsEmail()
  email: string;
}
