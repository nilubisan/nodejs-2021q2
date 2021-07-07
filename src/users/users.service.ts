import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ReturnSafeUserDto } from './dto/return-safe-user.dto';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './users.storage'
import { TasksService } from 'src/tasks/tasks.service';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserRepository) private storage: UserRepository, private tasksService: TasksService) {}
  async create(createUserDto: CreateUserDto): Promise<ReturnSafeUserDto> {
    return await this.storage.createUser(createUserDto)
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.storage.getAllUsers();
    return users;
  }

  async findOne(id: string): Promise<UserEntity | 'NOT FOUND'> {
    return await this.storage.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity | 'NOT FOUND'> {
    return await this.storage.updateUser(id, updateUserDto);
  }

  async remove(id: string): Promise<'NOT FOUND' | 'DELETED'> {
    const result = await this.storage.removeUser(id);
    if(result === 'DELETED') {
      await this.tasksService.unassignUser(id)
    }
    return result;
  }
}