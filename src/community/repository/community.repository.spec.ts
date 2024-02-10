import { Test, TestingModule } from '@nestjs/testing';
import { CommunityRepository } from './community.repository';

describe('CommunityService', () => {
  let repository: CommunityRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommunityRepository],
    }).compile();

    repository = module.get<CommunityRepository>(CommunityRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
