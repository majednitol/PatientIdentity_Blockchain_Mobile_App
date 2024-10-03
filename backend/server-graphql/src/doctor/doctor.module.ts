import { Module } from '@nestjs/common';
import { DoctorResolver } from './doctor.resolver';
import { DoctorService } from './doctor.service';

@Module({
  providers: [DoctorResolver, DoctorService]
})
export class DoctorModule {}
