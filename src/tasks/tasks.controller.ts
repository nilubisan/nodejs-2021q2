import { Controller, Get, Post, Body, Put, Param, Delete, Res, HttpStatus, UseGuards, UseFilters } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { HttpExceptionFilter } from 'src/exception-filters/http-exception.filter';

@UseFilters(HttpExceptionFilter)
@Controller('/boards/:boardId/tasks/')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Param('boardId') boardId: string, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(boardId, createTaskDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getTasksByBoardId(@Param('boardId') boardId: string, @Res() res: Response) {
    const result = await this.tasksService.getTasksByBoardId(boardId);
    if(result === 'NOT FOUND') res.status(HttpStatus.NOT_FOUND).send();
    else res.status(HttpStatus.OK).json(result);
  }

  @Get(':taskId')
  @UseGuards(AuthGuard('jwt'))
  async getTask(@Param('boardId') boardId: string, @Param('taskId') taskId: string, @Res() res: Response) {
    const result = await this.tasksService.getTask(boardId, taskId);
    if(result === 'NOT FOUND') res.status(HttpStatus.NOT_FOUND).send();
    else res.status(HttpStatus.OK).json(result);
  }

  @Put(':taskId')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('boardId') boardId: string, @Param('taskId') taskId: string, @Body() updateTaskDto: UpdateTaskDto, @Res() res: Response) {
    const result = await this.tasksService.update(updateTaskDto, boardId, taskId);
    if(result === 'NOT FOUND') res.status(HttpStatus.NOT_FOUND).send();
    else res.status(HttpStatus.OK).json(result);
  }

  @Delete(':taskId')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('boardId') boardId: string, @Param('taskId') taskId: string, @Res() res: Response ) {
    const result = await this.tasksService.remove(boardId, taskId);
    if(result === 'NOT FOUND') res.status(HttpStatus.NOT_FOUND).send();
    else res.status(HttpStatus.NO_CONTENT).send();
  }
}