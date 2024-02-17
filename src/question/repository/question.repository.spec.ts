import { Test, TestingModule } from '@nestjs/testing';
import { QuestionRepository } from './question.repository';

describe('QuestionRepository', () => {
  let repository: QuestionRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionRepository],
    }).compile();

    repository = module.get<QuestionRepository>(QuestionRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
