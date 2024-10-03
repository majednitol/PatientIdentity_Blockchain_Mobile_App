import { Module } from '@nestjs/common';
import { PatientResolver } from './patient.resolver';
import { PatientService } from './patient.service';

@Module({
  providers: [PatientResolver, PatientService]
})
export class PatientModule {}
