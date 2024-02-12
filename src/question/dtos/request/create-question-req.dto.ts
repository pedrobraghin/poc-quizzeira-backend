import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { CreateAlternativeReqDTO } from './create-alternative-req.dto';
import { Type } from 'class-transformer';

export class CreateQuestionReqDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  image?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAlternativeReqDTO)
  @ArrayMinSize(1)
  alternatives: Array<CreateAlternativeReqDTO>;
}
