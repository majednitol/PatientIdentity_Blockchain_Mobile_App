import { Module } from '@nestjs/common';
import { MedicalResearchLabResolver } from './medical-research-lab.resolver';
import { MedicalResearchLabService } from './medical-research-lab.service';

@Module({
  providers: [MedicalResearchLabResolver, MedicalResearchLabService]
})
export class MedicalResearchLabModule {}
