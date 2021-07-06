import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouterModule } from 'nest-router';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { Connection } from 'typeorm';
import { BoardsModule } from './boards/boards.module';
import { TasksModule } from './tasks/tasks.module';
import * as dotenv from 'dotenv'
import * as path from 'path';
import { routes } from './routes';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env['DB_HOST'],
      port: +process.env['DB_PORT'],
      username: process.env['DB_USERNAME'],
      password: process.env['DB_PASSWORD'],
      database: process?.env?.['DB_NAME'],
      entities: [path.join(__dirname, './entities/*.ts')],
      synchronize: true,
      autoLoadEntities: true
    }),
    RouterModule.forRoutes(routes),
    UsersModule,
    BoardsModule,
    TasksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export default class AppModule {
  constructor(private connection: Connection) {}
}