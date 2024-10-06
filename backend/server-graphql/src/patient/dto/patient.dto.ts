// src/patient/patient.model.ts
import { Field, ObjectType, ID, InputType } from '@nestjs/graphql';
import { PatientPersonalData } from './patient-personal-data.dto';
import {
  IsEthereumAddress,
} from 'class-validator';

import { IsNotEmpty, IsString, IsNumber, IsEmail } from 'class-validator';

@InputType()
export class CreatePatientDto {
  @Field()
  @IsNumber()
  @IsNotEmpty()
  patientID: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  gender: string;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  age: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  location: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  birthday: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  emailAddress: string;
}

@ObjectType()
export class Patient {

  @Field()
  @IsEthereumAddress()
  patientAddress: string;

  @Field(() => ID)
  patientID: number;



  @Field()
  name: string;

  @Field()
  gender: string;

  @Field()
  age: number;

  @Field()
  location: string;

  @Field()
  isAdded: boolean;

  @Field()
  userType: string;

  @Field(() => [String], { nullable: 'itemsAndList' })
  imgUrl: string[];

  @Field(() => PatientPersonalData)
  patientPersonalData: PatientPersonalData;

  @Field({nullable:true})
  profilePic: string;

  @Field()
  birthday: string;

  @Field()
  emailAddress: string;

}
