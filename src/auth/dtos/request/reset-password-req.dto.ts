import { IsJWT, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Match } from 'src/common/match.decorator';

export class ResetPasswordReqDTO {
  @IsJWT()
  token: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @Match('password')
  passwordConfirm: string;
}
