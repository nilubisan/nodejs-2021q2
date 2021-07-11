import { Controller, Get, Post, Body, Put, Param, Delete, HttpStatus, Res, UseFilters, Logger } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/exception-filters/http-exception.filter';

@UseFilters(HttpExceptionFilter)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  private readonly logger = new Logger(UsersService.name);

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createUserDto: CreateUserDto, @Res() res:Response) {
    const result = await this.usersService.create(createUserDto);
    res.status(HttpStatus.CREATED).json(result);
    this.logger.log(createUserDto)
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(@Res() res: Response) {
    const users = await this.usersService.findAll();
    res.status(HttpStatus.OK).json(users);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: string, @Res() res:Response) {
    const result = await this.usersService.findById(id);
    if (result === 'NOT FOUND') res.status(HttpStatus.NOT_FOUND).send(result);
    else res.status(HttpStatus.OK).json(result);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Res() res: Response) {
    const result = await this.usersService.update(id, updateUserDto);
    if(result === 'NOT FOUND') res.status(HttpStatus.NOT_FOUND).send(result);
    res.status(HttpStatus.OK).json(result);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string, @Res() res: Response) {
    const result = await this.usersService.remove(id);
    if (result === 'DELETED') res.status(HttpStatus.NO_CONTENT).send(result);
    else res.status(HttpStatus.NOT_FOUND).send(result);
  }
}