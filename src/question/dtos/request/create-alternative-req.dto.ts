import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateAlternativeReqDTO {
  @IsBoolean()
  isCorrect: boolean;

  @IsString()
  @IsNotEmpty()
  text: string;
}
