import { Controller, Get, Post, Body, Put, Param, Delete, Res, HttpStatus, UseGuards, UseFilters } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { HttpExceptionFilter } from 'src/exception-filters/http-exception.filter';

@UseFilters(HttpExceptionFilter)
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createBoardDto: CreateBoardDto) {
    return await this.boardsService.create(createBoardDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll() {
    return await this.boardsService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: string, @Res() res:Response) {
    const result = await this.boardsService.findOne(id);
    if (result === 'NOT FOUND') res.status(HttpStatus.NOT_FOUND).send(result);
    else res.status(HttpStatus.OK).json(result);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto, @Res() res: Response) {
    const result = await this.boardsService.update(id, updateBoardDto);
    if(result === 'NOT FOUND') res.status(HttpStatus.NOT_FOUND).send(result);
    res.status(HttpStatus.OK).json(result);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string, @Res() res: Response) {
    const result = await this.boardsService.remove(id);
    if (result === 'DELETED') res.status(HttpStatus.NO_CONTENT).send(result);
    else res.status(HttpStatus.NOT_FOUND).send(result);
  }
}