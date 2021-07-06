import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Response } from 'express';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get(':boardId')
  async getTasksByBoardId(@Param('boardId') boardId: string, @Res() res: Response) {
    const result = await this.tasksService.getTasksByBoardId(boardId);
    if(result === 'NOT FOUND') res.status(HttpStatus.NOT_FOUND).send();
    else res.status(HttpStatus.OK).json(result);
  }

  @Get(':taskId')
  async getTask(@Param('boardId') boardId: string, @Param('taskId') taskId: string, @Res() res: Response) {
    const result = await this.tasksService.getTask(boardId, taskId);
    if(result === 'NOT FOUND') res.status(HttpStatus.NOT_FOUND).send();
    else res.status(HttpStatus.OK).json(result);
  }

  @Patch(':taskId')
  async update(@Param('boardId') boardId: string, @Param('taskId') taskId: string, @Body() updateTaskDto: UpdateTaskDto, @Res() res: Response) {
    const result = await this.tasksService.update(updateTaskDto, boardId, taskId);
    if(result === 'NOT FOUND') res.status(HttpStatus.NOT_FOUND).send();
    else res.status(HttpStatus.OK).json(result);
  }

  @Delete(':id')
  async remove(@Param('boardId') boardId: string, @Param('taskId') taskId: string, @Res() res: Response ) {
    const result = await this.tasksService.remove(boardId, taskId);
    if(result === 'NOT FOUND') res.status(HttpStatus.NOT_FOUND).send();
    else res.status(HttpStatus.NO_CONTENT).send();
  }
}
