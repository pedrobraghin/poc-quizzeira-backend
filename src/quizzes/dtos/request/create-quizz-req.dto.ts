import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateQuestionReqDTO } from 'src/question/dtos';

export class CreateQuizzReqDTO {
  questions: Array<CreateQuestionReqDTO>;
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  image?: string;
}
