import { Injectable } from "@nestjs/common";
import { UsersStore } from "./interfaces/user-storage.interface";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserEntity } from "./entities/user.entity";
import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from "bcryptjs"
import * as dotenv from 'dotenv'
import { ReturnSafeUserDto } from "./dto/return-safe-user.dto";
dotenv.config();

@Injectable()
@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity>  {
    async createUser(createUserDto: CreateUserDto): Promise<ReturnSafeUserDto> {
        const hashedPassword = await bcrypt.hash(
          createUserDto.password,
          Number(process.env['SALT'])
        );
        createUserDto.password = hashedPassword;
        const newUser = await this.create(createUserDto);
        const savedUser = await this.save(newUser);
        const { id, login, name } = savedUser;
        return { id, login, name };
      }
    
      async getAllUsers(): Promise<UserEntity[]> {
        return await this.find({});
      }
    
      async findById(id: string): Promise<UserEntity | 'NOT FOUND'> {
        const user = await this.findOne(id);
        if (user === undefined) return 'NOT FOUND';
        return user;
      }
    
      async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity | 'NOT FOUND'> {
        const userToUpdate = await this.findOne(id);
        if (userToUpdate === undefined) return 'NOT FOUND';
        const updatedUser = await this.update(id, updateUserDto);
        return updatedUser.raw;
      }
    
      async removeUser(id: string): Promise<'NOT FOUND' | 'DELETED'> {
        const deletionRes = await this.delete(id);
        if (deletionRes.affected) return 'DELETED';
        return 'NOT FOUND';
      }

}
