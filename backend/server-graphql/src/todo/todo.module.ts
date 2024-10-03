// src/todo/todo.module.ts
import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoResolver } from './todo.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './schemas/todo.schema';
import { EncryptionUtil } from './utils/encryption.util';

import { RedisService } from './utils/redis.service';


@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Todo.name,
        imports: [],
        useFactory: () => {
          const schema = TodoSchema;
          return schema;
        },
      },
    ]),
// Import CacheModule locally
  ],
  providers: [TodoResolver, TodoService, EncryptionUtil,RedisService],
})
export class TodoModule {}
