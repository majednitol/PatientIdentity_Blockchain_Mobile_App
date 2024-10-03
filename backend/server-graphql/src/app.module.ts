import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { TodoModule } from './todo/todo.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { AdminModule } from './admin/admin.module';
import { PatientModule } from './patient/patient.module';
import { DoctorModule } from './doctor/doctor.module';
import { PharmacyCompanyModule } from './pharmacy-company/pharmacy-company.module';
import { MedicalResearchLabModule } from './medical-research-lab/medical-research-lab.module';
import { PathologistModule } from './pathologist/pathologist.module';


export const pubSub = new RedisPubSub({
  connection: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    retryStrategy: (times) => Math.min(times * 50, 2000),
  },
});

@Module({
  imports: [
    // Load configuration globally
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Set up MongoDB connection with Mongoose
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI') || 'mongodb://localhost:27017/todo',
      }),
      inject: [ConfigService],
    }),

    // GraphQL setup using ApolloDriver and Redis PubSub for subscriptions
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: async () => ({
         // Add this line
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        sortSchema: true,
        playground: true,
        subscriptions: {
          'graphql-ws': true, 
          'subscriptions-transport-ws': true, 
          path: '/graphql',
        },
        context: ({ req, res, connection }) => {
          if (connection) {
            return { req, res, pubSub }; 
          }
          return { req, res };
        },
      }),
    }),

    // Import the TodoModule for CRUD operations
    TodoModule,

    AdminModule,

    PatientModule,

    DoctorModule,

    PharmacyCompanyModule,

    MedicalResearchLabModule,

    PathologistModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
