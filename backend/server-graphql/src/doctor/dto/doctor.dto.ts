// src/doctor/doctor-view.model.ts
import { Field, ObjectType, ID, InputType } from '@nestjs/graphql';
// doctor.dto.ts
import { IsNotEmpty, IsString, IsInt, IsNumber, IsEthereumAddress } from 'class-validator';
@InputType()
export class CreateDoctorDto {

  @IsNotEmpty()
  @IsInt()
  doctorID: number;

  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  specialty: string;

  @Field()
  @IsNotEmpty()
  @IsNumber()
  consultationFee: number;

  @Field()
  @IsNotEmpty()
  @IsInt()
  BMDCNumber: number;

  @Field()
  @IsNotEmpty()
  @IsInt()
  yearOfExperience: number;

  @Field()
  @IsNotEmpty()
  @IsString()
  birthday: string;

}

@ObjectType()
export class Doctor {
  @Field(() => String)
  @IsEthereumAddress()
  doctorAddress: string;

  @Field(() => ID)
  doctorID: number;

  @Field()
  name: string;

  @Field()
  specialty: string;

  @Field()
  consultationFee: number;

  @Field()
  BMDCNumber: number;

  @Field()
  yearOfExperience: number;

  @Field()
  userType: string;

  @Field()
  profilePic: string;

  @Field()
  birthday: string;

  @Field()
  emailAddress: string;
}
