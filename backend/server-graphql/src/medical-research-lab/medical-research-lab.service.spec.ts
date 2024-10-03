import { Test, TestingModule } from '@nestjs/testing';
import { MedicalResearchLabService } from './medical-research-lab.service';

describe('MedicalResearchLabService', () => {
  let service: MedicalResearchLabService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicalResearchLabService],
    }).compile();

    service = module.get<MedicalResearchLabService>(MedicalResearchLabService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
