import { Module } from '@nestjs/common';
import { PharmacyCompanyResolver } from './pharmacy-company.resolver';
import { PharmacyCompanyService } from './pharmacy-company.service';

@Module({
  providers: [PharmacyCompanyResolver, PharmacyCompanyService]
})
export class PharmacyCompanyModule {}
