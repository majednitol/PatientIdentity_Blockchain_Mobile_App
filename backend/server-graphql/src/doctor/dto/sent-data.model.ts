// src/sent-data/sent-data.model.ts
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SentData {
  @Field(() => [String], { nullable: 'itemsAndList' })
  imagesUrl: string[];
}
