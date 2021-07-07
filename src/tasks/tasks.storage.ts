import { Injectable } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { TaskEntity } from './entities/task.entity'

@Injectable()
@EntityRepository(TaskEntity)
export class TasksRepository extends Repository<TaskEntity> {
    async getTasksByBoardId (taskBoardID: string): Promise<Array<TaskEntity> | 'NOT FOUND'>  {
        const tasks = await this.find({ boardId: taskBoardID });
        if (tasks === undefined) return 'NOT FOUND';
        return tasks;
      };
      
      async createTask (boardId: string, task: CreateTaskDto): Promise<TaskEntity> {
        task.boardId = boardId;
        const newTask = await this.create(task);
        const savedTask = await this.save(newTask);
        return savedTask;
      };
      
      async getTask (__boardID: string, taskID: string): Promise<TaskEntity | 'NOT FOUND'> {
        const task = await this.findOne(taskID);
        if (task === undefined) return 'NOT FOUND';
        return task;
      };
      
      async updateTask (task: UpdateTaskDto, __boardID: string, taskID: string): Promise<TaskEntity | 'NOT FOUND'> {
        const updatedTask = await this.update(taskID, task);
        if (updatedTask.affected) return updatedTask.raw;
        return 'NOT FOUND';
      };
      
      async deleteTask (__boardID: string, taskID: string): Promise<'NOT FOUND' | 'DELETED'> {
        const deletionRes = await this.delete(taskID);
        if (deletionRes.affected) return 'DELETED';
        return 'NOT FOUND';
      };
      
      async unassignUser (deletedUserID: string): Promise<void> {
        await this.update({ userId: deletedUserID }, { userId: null });
      };
      
      async deleteBoardsTasks (deletedBoardID: string): Promise<void> {
        console.log(deletedBoardID);
        const tasksToDelete = await this.find({ boardId: deletedBoardID });
        console.log(tasksToDelete);
        await this.remove(tasksToDelete);
      };    
}

