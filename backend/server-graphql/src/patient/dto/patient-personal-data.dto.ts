// src/patient/patient-personal-data.model.ts
import { Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { InputType } from '@nestjs/graphql';

@InputType()
export class UpdatePatientPersonalDataDto {
    @IsNotEmpty()
    @IsString()
    height: string;

    @IsNotEmpty()
    @IsString()
    blood: string;

    @IsNotEmpty()
    @IsString()
    previousDiseases: string;

    @IsNotEmpty()
    @IsString()
    medicineDrugs: string;

    @IsNotEmpty()
    @IsString()
    badHabits: string;

    @IsNotEmpty()
    @IsString()
    chronicDiseases: string;

    @IsNotEmpty()
    @IsString()
    healthAllergies: string;

    @IsNotEmpty()
    @IsString()
    birthDefects: string;
}

@ObjectType()
export class PatientPersonalData {
  @Field()
  height: string;

  @Field()
  blood: string;

  @Field()
  previousDiseases: string;

  @Field()
  medicineDrugs: string;

  @Field()
  badHabits: string;

  @Field()
  chronicDiseases: string;

  @Field()
  healthAllergies: string;

  @Field()
  birthDefects: string;
}
