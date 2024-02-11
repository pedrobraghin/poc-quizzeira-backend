import { CreateQuestionReqDTO } from 'src/question/dtos';

export class CreateQuizzReqDTO {
  questions: Array<CreateQuestionReqDTO>;
  title: string;
  description: string;
  category: string;
  image?: string;
}
