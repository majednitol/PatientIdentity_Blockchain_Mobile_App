import { Test, TestingModule } from '@nestjs/testing';
import { PathologistResolver } from './pathologist.resolver';

describe('PathologistResolver', () => {
  let resolver: PathologistResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PathologistResolver],
    }).compile();

    resolver = module.get<PathologistResolver>(PathologistResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
