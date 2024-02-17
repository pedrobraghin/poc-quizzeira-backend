export interface QuestionDTO {
  id: string;
  title: string;
  authorId: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}
