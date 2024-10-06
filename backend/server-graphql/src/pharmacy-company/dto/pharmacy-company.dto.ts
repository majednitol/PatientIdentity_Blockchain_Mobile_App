// src/pharmacy-company/pharmacy-company.model.ts
import { Field, ObjectType, ID } from '@nestjs/graphql';

import { IsNotEmpty, IsString, IsInt, IsEthereumAddress } from 'class-validator';
import { InputType } from '@nestjs/graphql';

@InputType()
export class CreatePharmacyCompanyDto {
    @IsNotEmpty()
    @IsInt()
    companyID: number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsInt()
    licenseID: number;

    @IsNotEmpty()
    @IsString()
    productInformation: string;

    @IsNotEmpty()
    @IsInt()
    pharmacyRating: number;
}

@ObjectType()
export class PharmacyCompany {
  @Field(() => ID)
  companyID: number;

  @Field(() => String)
  @IsEthereumAddress()
  pharmacyCompanyAddress: string;

  @Field()
  name: string;

  @Field()
  licenseID: number;

  @Field()
  productInformation: string;

  @Field()
  pharmacyRating: number;

  @Field()
  isAdded: boolean;

  @Field()
  userType: string;

  @Field(() => [String], { nullable: 'itemsAndList' })
  topMedicine: string[];

  @Field()
  profilePic: string;

  @Field()
  emailAddress: string;
}
