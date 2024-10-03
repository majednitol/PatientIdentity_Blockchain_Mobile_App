import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { Redis } from 'ioredis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisService {
  private redisClient: Redis;
  private readonly logger = new Logger(RedisService.name);

  constructor(private configService: ConfigService) {
    const redisUri = this.configService.get<string>('REDIS_URL');

    if (!redisUri) {
      this.logger.error('Redis URI is not provided');
      throw new HttpException('Redis URI is required', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    this.redisClient = new Redis(redisUri);

    this.redisClient.on('connect', () => {
      this.logger.log('Redis connected');
    });

    this.redisClient.on('error', (err) => {
      this.logger.error('Redis connection error', err);
      throw new HttpException('Redis connection error', HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  getClient(): Redis {
    if (!this.redisClient.status || this.redisClient.status !== 'ready') {
      const errorMsg = 'Redis client is not connected';
      this.logger.error(errorMsg);
      throw new HttpException(errorMsg, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return this.redisClient;
  }
}
