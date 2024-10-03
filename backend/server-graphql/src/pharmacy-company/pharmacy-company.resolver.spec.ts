import { Test, TestingModule } from '@nestjs/testing';
import { PharmacyCompanyResolver } from './pharmacy-company.resolver';

describe('PharmacyCompanyResolver', () => {
  let resolver: PharmacyCompanyResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PharmacyCompanyResolver],
    }).compile();

    resolver = module.get<PharmacyCompanyResolver>(PharmacyCompanyResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
