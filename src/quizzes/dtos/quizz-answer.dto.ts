import { CreateAnswerReqDTO } from './request';

export interface QuizzAnswerDTO {
  id: string;
  userId: string;
  quizzId: string;
  answers: Array<CreateAnswerReqDTO>;
  createdAt: Date;
  updatedAt: Date;
}
