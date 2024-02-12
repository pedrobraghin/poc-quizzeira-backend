import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserReqDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  picture?: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  passwordConfirm: string;
}
