import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from './entities/task.entity';
import { TasksRepository } from './tasks.storage';

@Injectable()
export class TasksService {
  constructor(private storage: TasksRepository) {}
  async create(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return await this.storage.createTask(createTaskDto);
  }

  async getTasksByBoardId(boardID: string): Promise<Array<TaskEntity> | 'NOT FOUND'> {
    return await this.storage.getTasksByBoardId(boardID);
  }

  async getTask(boardID: string, taskID: string): Promise<TaskEntity | 'NOT FOUND'> {
    return await this.storage.getTask(boardID, taskID);
  }

  async update(task: UpdateTaskDto, boardID: string, taskID: string): Promise<TaskEntity | 'NOT FOUND'> {
    return await this.storage.updateTask(task, boardID, taskID);
  }

  async remove(boardID: string, taskID: string): Promise<'NOT FOUND' | 'DELETED'> {
    return await this.storage.deleteTask(boardID, taskID);
  }

  async unassignUser (deletedUserID: string): Promise<void> {
    await this.storage.unassignUser(deletedUserID);
  };
  
  async deleteBoardsTasks (deletedBoardID: string): Promise<void> {
    await this.storage.deleteBoardsTasks(deletedBoardID);
  };    
}
