import { CreateAlternativeReqDTO } from './create-alternative-req.dto';

export class CreateQuestionReqDTO {
  title: string;
  image?: string;
  alternatives: Array<CreateAlternativeReqDTO>;
}
