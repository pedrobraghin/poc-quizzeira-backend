import { QuestionDTO } from 'src/question/dtos';

export interface QuizzDTO {
  id: string;
  authorId: string;
  title: string;
  description: string;
  questions: Array<QuestionDTO>;
  createdAt: Date;
  updatedAt: Date;
}
