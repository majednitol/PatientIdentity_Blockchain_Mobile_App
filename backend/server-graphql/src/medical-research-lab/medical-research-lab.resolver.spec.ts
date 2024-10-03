import { Test, TestingModule } from '@nestjs/testing';
import { MedicalResearchLabResolver } from './medical-research-lab.resolver';

describe('MedicalResearchLabResolver', () => {
  let resolver: MedicalResearchLabResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicalResearchLabResolver],
    }).compile();

    resolver = module.get<MedicalResearchLabResolver>(MedicalResearchLabResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
