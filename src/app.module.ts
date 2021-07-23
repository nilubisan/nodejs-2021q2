import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { Connection } from 'typeorm';
import { BoardsModule } from './boards/boards.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv'
import * as path from 'path';
import * as config from './database/ormconfig'

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    UsersModule,
    BoardsModule,
    TasksModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export default class AppModule {
  constructor(private connection: Connection) {
  }
}