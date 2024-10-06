// src/medical-research-lab/medical-research-lab.model.ts
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsInt, IsEthereumAddress } from 'class-validator';
import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateMedicalResearchLabDto {
    @IsNotEmpty()
    @IsInt()
    labID: number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsInt()
    licenseID: number;

    @IsNotEmpty()
    @IsString()
    researchArea: string;

    @IsNotEmpty()
    @IsInt()
    labRating: number;
}

@ObjectType()
export class MedicalResearchLab {
  @Field(() => ID)
  labID: number;

  @Field(() => String)
  @IsEthereumAddress()
  labAddress: string;

  @Field()
  name: string;

  @Field()
  licenseID: number;

  @Field()
  researchArea: string;

  @Field()
  labRating: number;

  @Field()
  isAdded: boolean;

  @Field(() => [String], { nullable: 'itemsAndList' })
  imgUrl: string[];

  @Field()
  userType: string;

  @Field()
  profilePic: string;

  @Field()
  emailAddress: string;
}
