import { Test, TestingModule } from '@nestjs/testing';
import { PathologistService } from './pathologist.service';

describe('PathologistService', () => {
  let service: PathologistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PathologistService],
    }).compile();

    service = module.get<PathologistService>(PathologistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
