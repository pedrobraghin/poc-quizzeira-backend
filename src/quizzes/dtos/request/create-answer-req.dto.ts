import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAnswerReqDTO {
  @IsString()
  @IsNotEmpty()
  questionId: string;

  @IsString()
  @IsNotEmpty()
  alternativeId: string;
}
