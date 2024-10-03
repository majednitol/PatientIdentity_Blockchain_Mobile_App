// src/todo/schemas/todo.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
@Schema({ timestamps: true })
export class Todo extends Document {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop({ required: true })
  title: string;

  @Field({ nullable: true })
  @Prop()
  description?: string;

  @Field()
  @Prop({ default: false })
  completed: boolean;

  @Field(() => Date, { nullable: true }) // Add this field
  @Prop()
  createdAt?: Date;

  @Field(() => Date, { nullable: true }) // Add this field
  @Prop()
  updatedAt?: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
