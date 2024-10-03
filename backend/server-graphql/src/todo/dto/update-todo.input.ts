import { InputType, Field, ID } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class UpdateTodoInput {
  @Field(() => ID)
  _id: string;

  @Field({ nullable: true })
  @IsOptional()
  title?: string;

  @Field({ nullable: true })
  @IsOptional()
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  completed?: boolean;
}