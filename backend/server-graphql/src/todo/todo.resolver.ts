// src/todo/todo.resolver.ts

import { Resolver, Query, Mutation, Args, ID, Subscription } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { Todo } from './schemas/todo.schema';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { PubSub } from 'graphql-subscriptions';



const pubSub = new PubSub();

@Resolver(() => Todo)

export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  // Queries
  @Query(() => [Todo], { name: 'getAllTodos' })
  async getAllTodos(): Promise<Todo[]> {
    const todos = await this.todoService.findAll();
    return todos;
    
  }

  @Query(() => Todo, { name: 'getTodoById' })
  async getTodoById(@Args('_id', { type: () => ID }) _id: string): Promise<Todo> {
    // console.log('Fetching Todo by ID:', id);
    const todo = await this.todoService.findOne(_id);
    // console.log('Fetched Todo:', todo);
    return todo;
  }

  // Mutations
  @Mutation(() => Todo, { name: 'createTodo' })
  async createTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput): Promise<Todo> {
    console.log('Creating Todo with input:', createTodoInput);
    const todo = await this.todoService.create(createTodoInput);
    console.log('Created Todo:', todo);

    // Publish the event
    pubSub.publish('todoCreated', { todoCreated: todo });
    return todo;
  }

  @Mutation(() => Todo, { name: 'updateTodo' })
  async updateTodo(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput): Promise<Todo> {
    console.log('Updating Todo with input:', updateTodoInput);
    const todo = await this.todoService.update(updateTodoInput._id, updateTodoInput);
    console.log('Updated Todo:', todo);

    // Publish the event
    pubSub.publish('todoUpdated', { todoUpdated: todo });
    return todo;
  }

  @Mutation(() => Todo, { name: 'deleteTodo' })
  async deleteTodo(@Args('_id', { type: () => ID }) _id: string): Promise<Todo> {
    console.log('Deleting Todo with ID:', _id);
    const todo = await this.todoService.remove(_id);
    console.log('Deleted Todo:', todo);

    // Publish the event
    pubSub.publish('todoDeleted', { todoDeleted: todo });
    return todo;
  }

  // Subscriptions
  @Subscription(() => Todo, {
    name: 'todoCreated',
    resolve: (value) => {
      const todo = value.todoCreated;
      if (!todo._id) {
        throw new Error('Todo ID is required');
      }
      console.log('Subscription: todoCreated event', value);

      return todo
  
    ;
    },
  })
  todoCreated() {
    return pubSub.asyncIterator('todoCreated');
  }

  @Subscription(() => Todo, {
    name: 'todoUpdated',
    resolve: (value) => {
      const todo = value.todoUpdated;
      console.log('Subscription: todoUpdated event', todo._id);

      if (!todo._id) {
        throw new Error('Todo ID is required');
      }
      console.log('Subscription: todoUpdated event payload', value);
      return todo

      ;
    },
  })
  todoUpdated() {
    return pubSub.asyncIterator('todoUpdated');
  }

  @Subscription(() => Todo, {
    name: 'todoDeleted',
    resolve: (value) => {
      const todo = value.todoDeleted;
      console.log('Subscription: todoDeleted event', todo._id);

      if (!todo._id) {
        throw new Error('Todo ID is required');
      }
      console.log('Subscription: todoDeleted event payload', value);
      return  todo

    
    },
  })
  todoDeleted() {
    return pubSub.asyncIterator('todoDeleted');
  }
}
