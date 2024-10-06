// src/admin-data/admin-data.model.ts
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AdminData {
  @Field()
  totalNumberOfPatient: number;

  @Field()
  totalNumberOfDoctor: number;

  @Field()
  totalNumberOfPathologist: number;

  @Field()
  totalNumberOfPharmacyCompany: number;

  @Field()
  totalNumberOfMedicalResearchLab: number;

  @Field()
  totalNumberOfPremiumPatient: number;

  @Field()
  totalNumberOfPremiumDoctor: number;

  @Field()
  totalNumberOfPremiumPathologist: number;

  @Field()
  totalNumberOfPremiumPharmacyCompany: number;

  @Field()
  totalNumberOfPremiumMedicalResearchLab: number;
}
