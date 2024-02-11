import { CreateAnswerReqDTO } from './create-answer-req.dto';

export class AnswerQuizzReqDTO {
  quizzId: string;
  answers: Array<CreateAnswerReqDTO>;
}
