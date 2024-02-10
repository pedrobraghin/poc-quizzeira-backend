import { Test, TestingModule } from '@nestjs/testing';
import { QuizzesRepository } from './quizzes.repository';

describe('QuizzesService', () => {
  let repository: QuizzesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuizzesRepository],
    }).compile();

    repository = module.get<QuizzesRepository>(QuizzesRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
