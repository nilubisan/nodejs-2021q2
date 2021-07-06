import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './users.storage'

@Injectable()
export class UsersService {
  constructor(private storage: UserRepository) {}
  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    return await this.storage.createUser(createUserDto)
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.storage.getAllUsers();
    return users;
  }

  async findOne(id: string): Promise<UserEntity | 'NOT FOUND'> {
    return this.storage.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity | 'NOT FOUND'> {
    return this.storage.updateUser(id, updateUserDto);
  }

  async remove(id: string): Promise<'NOT FOUND' | 'DELETED'> {
    return this.storage.removeUser(id);
  }
}