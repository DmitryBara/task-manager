import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { PhaseModule } from './phase/phase.module';
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core'


@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      introspection: true,
      path: '/api/graphql',
      autoSchemaFile: true,
      debug: true,
      playground: false,
      plugins: [
        ApolloServerPluginLandingPageLocalDefault()
      ],
    }),
    TaskModule,
    PhaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
