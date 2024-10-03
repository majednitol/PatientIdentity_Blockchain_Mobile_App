import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from './schemas/todo.schema';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { EncryptionUtil } from './utils/encryption.util';
import { RedisService } from './utils/redis.service';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name) private todoModel: Model<Todo>,
    private encryptionUtil: EncryptionUtil,
    private redisService: RedisService,
  ) {}

  async create(createTodoInput: CreateTodoInput): Promise<Todo> {
    const encryptedInput = {
      ...createTodoInput,
      title: this.encryptionUtil.encrypt(createTodoInput.title),
      description: createTodoInput.description
        ? this.encryptionUtil.encrypt(createTodoInput.description)
        : undefined,
    };

    const createdTodo = new this.todoModel(encryptedInput);
    const savedTodo = await createdTodo.save();

    // Clear cache for getAllTodos since data has changed
    const redisClient = this.redisService.getClient();
    await redisClient.del('getAllTodos');

    return this.decryptTodo(savedTodo);
  }

  async findAll(): Promise<Todo[]> {
    const redisClient = this.redisService.getClient();

    // Try to get cached Todos
    const cachedTodos = await redisClient.get('getAllTodos');
    if (cachedTodos) {
      console.log('Returning cached todos', cachedTodos);
      return JSON.parse(cachedTodos);
    }

    const todos = await this.todoModel.find().exec();
    console.log(todos);

    if (todos.length === 0) {
      throw new HttpException(`No todos found`, HttpStatus.NOT_FOUND);
    }

    const decryptedTodos = todos.map((todo) => this.decryptTodo(todo));
    await redisClient.set('getAllTodos', JSON.stringify(decryptedTodos), 'EX', 600); // Cache for 10 minutes

    return decryptedTodos;
  }

  async findOne(_id: string): Promise<Todo> {
    const redisClient = this.redisService.getClient();
    const cacheKey = `getTodoById:${_id}`;

    // Check if Todo is cached
    const cachedTodo = await redisClient.get(cacheKey);
    if (cachedTodo) {
      console.log(`Returning cached todo with ID ${_id}`);
      return JSON.parse(cachedTodo);
    }

    const todo = await this.todoModel.findById(_id).exec();
    if (!todo) {
      throw new HttpException(`Todo with ID ${_id} not found`, HttpStatus.NOT_FOUND);
    }

    const decryptedTodo = this.decryptTodo(todo);

    // Cache the Todo for future queries
    await redisClient.set(cacheKey, JSON.stringify(decryptedTodo), 'EX', 600); // Cache for 10 minutes

    return decryptedTodo;
  }

  async update(_id: string, updateTodoInput: UpdateTodoInput): Promise<Todo> {
    const redisClient = this.redisService.getClient();

    // Encrypt the update inputs
    const encryptedInput: Partial<CreateTodoInput> = { ...updateTodoInput };
    if (updateTodoInput.title) {
      encryptedInput.title = this.encryptionUtil.encrypt(updateTodoInput.title);
    }
    if (updateTodoInput.description) {
      encryptedInput.description = this.encryptionUtil.encrypt(updateTodoInput.description);
    }

    const updatedTodo = await this.todoModel.findByIdAndUpdate(_id, encryptedInput, {
      new: true,
    }).exec();

    if (!updatedTodo) {
      throw new HttpException(`Todo with ID ${_id} not found`, HttpStatus.NOT_FOUND);
    }

    // Clear cache for the updated Todo and the list
    await redisClient.del('getAllTodos');
    await redisClient.del(`getTodoById:${_id}`);

    return this.decryptTodo(updatedTodo);
  }

  async remove(_id: string): Promise<Todo> {
    const redisClient = this.redisService.getClient();

    const deletedTodo = await this.todoModel.findByIdAndDelete(_id).exec();
    if (!deletedTodo) {
      throw new HttpException(`Todo with ID ${_id} not found`, HttpStatus.NOT_FOUND);
    }

    // Clear cache for the removed Todo and the list
    await redisClient.del('getAllTodos');
    await redisClient.del(`getTodoById:${_id}`);

    return this.decryptTodo(deletedTodo);
  }

  private decryptTodo(todo: Todo): Todo {
    try {
      todo.title = this.encryptionUtil.decrypt(todo.title);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.FORBIDDEN);
    }

    if (todo.description) {
      try {
        todo.description = this.encryptionUtil.decrypt(todo.description);
      } catch (err: any) {
        throw new HttpException(err.message, HttpStatus.FORBIDDEN);
      }
    }
    return todo;
  }
}
