// src/pathologist/pathologist.model.ts
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { SentData } from 'src/doctor/dto/sent-data.model';

import { IsNotEmpty, IsString, IsInt, IsEthereumAddress } from 'class-validator';
import { InputType } from '@nestjs/graphql';

@InputType()
export class CreatePathologistDto {
    @IsNotEmpty()
    @IsInt()
    pathologistID: number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsInt()
    licenseNumber: number;

    @IsNotEmpty()
    @IsString()
    specializationArea: string;

    @IsNotEmpty()
    @IsInt()
    totalExperience: number;

    @IsNotEmpty()
    @IsString()
    birthday: string;

    @IsNotEmpty()
    @IsString()
    emailAddress: string;
}

@ObjectType()
export class Pathologist {
  @Field(() => ID)
  pathologistID: number;

  @Field(() => String)
  @IsEthereumAddress()
  pathologistAddress: string;

  @Field()
  name: string;

  @Field()
  licenseNumber: number;

  @Field()
  specializationArea: string;

  @Field()
  totalExperience: number;

  @Field()
  isAdded: boolean;

  @Field(() => [String], { nullable: 'itemsAndList' })
  patientToPathologist: string[]; // List of patient addresses

  @Field()
  userType: string;

  @Field()
  profilePic: string;

  @Field()
  birthday: string;

  @Field()
  emailAddress: string;

  @Field(() => [SentData], { nullable: 'itemsAndList' })
  userData: SentData[]; // Mapping(address => SentData) represented as array

  @Field(() => [String], { nullable: 'itemsAndList' })
  senderDoctor: string[];

  @Field(() => [String], { nullable: 'itemsAndList' })
  receiverDoctor: string[];
}
