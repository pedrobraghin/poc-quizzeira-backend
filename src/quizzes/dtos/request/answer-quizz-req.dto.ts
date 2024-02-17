import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateAnswerReqDTO } from './create-answer-req.dto';
import { Type } from 'class-transformer';

export class AnswerQuizzReqDTO {
  @IsString()
  @IsNotEmpty()
  quizzId: string;

  @IsArray()
  @ArrayMinSize(1)
  @Type(() => CreateAnswerReqDTO)
  @ValidateNested({ each: true })
  answers: Array<CreateAnswerReqDTO>;
}
