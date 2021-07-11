import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './users.storage'
import { TasksService } from 'src/tasks/tasks.service';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from "bcryptjs"
import { JwtPayload } from 'src/auth/jwt.interface';


@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserRepository) private storage: UserRepository, private tasksService: TasksService ) {
    this.storage.createUser({
      "login": "admin",
      "name": "admin",
      "password": "admin"
    } as CreateUserDto)
  }

  async create(createUserDto: CreateUserDto): Promise<UserDto> {

    return await this.storage.createUser(createUserDto)
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.storage.getAllUsers();
    return users;
  }

  async findByLogin(loginData: LoginUserDto): Promise<UserDto | undefined> {
    const { login, password } = loginData;
      const user = await this.storage.findOne({
        where: { login }
      })
      if(!user) throw new HttpException("User not found", HttpStatus.UNAUTHORIZED);
      const areEqual = await bcrypt.compare(password, user.password)
      if(!areEqual) throw new HttpException("Invalid credentials", HttpStatus.UNAUTHORIZED);
      return user;
  }

  async findByPayload({name}: JwtPayload) {
    return await this.storage.findOne({
      where: {name}
    })
  }

  async findById(id: string): Promise<UserDto | 'NOT FOUND'> {
    return await this.storage.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDto | 'NOT FOUND'> {
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