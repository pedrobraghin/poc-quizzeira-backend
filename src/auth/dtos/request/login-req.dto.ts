import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginReqDTO {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
