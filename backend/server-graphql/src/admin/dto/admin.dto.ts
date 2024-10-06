// src/admin/admin.model.ts
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { IsEthereumAddress } from 'class-validator';
import { IsNotEmpty, IsString, IsInt } from 'class-validator';
import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateAdminDto {
  @Field(() => ID)
  @IsNotEmpty()
  @IsInt()
  adminID: number;

  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  gender: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  birthday: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  emailAddress: string;

  @Field()
  @IsNotEmpty()
  @IsInt()
  age: number;

  @Field()
  @IsNotEmpty()
  @IsString()
  location: string;
}

@ObjectType()
export class Admin {
  @Field()
  @IsEthereumAddress()
  adminAddress: string;

  @Field(() => ID)
  adminID: number;



  @Field()
  name: string;

  @Field()
  gender: string;

  @Field({nullable:true})
  profilePic: string;

  @Field(() => [String], { nullable: "itemsAndList" })
  allPrescription: string[];

  @Field()
  isAdded: boolean;

  @Field()
  userType: string;

  @Field()
  birthday: string;

  @Field()
  emailAddress: string;

  @Field()
  age: number;

  @Field()
  location: string;
}
