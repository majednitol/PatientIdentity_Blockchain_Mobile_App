import { Test, TestingModule } from '@nestjs/testing';
import { PharmacyCompanyService } from './pharmacy-company.service';

describe('PharmacyCompanyService', () => {
  let service: PharmacyCompanyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PharmacyCompanyService],
    }).compile();

    service = module.get<PharmacyCompanyService>(PharmacyCompanyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
