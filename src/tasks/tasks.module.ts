import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepository } from './tasks.storage';

@Module({
  imports: [TypeOrmModule.forFeature([TasksRepository])],
  exports: [TasksService],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}