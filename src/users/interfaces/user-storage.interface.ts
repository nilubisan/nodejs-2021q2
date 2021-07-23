import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UserEntity } from "../entities/user.entity";

export interface UsersStore {
    getAllUsers: () => Promise<UserEntity[]>,
    findById: (id: string) => Promise<UserEntity | 'NOT FOUND'>,
    create: (params: CreateUserDto) => Promise<UserEntity>,
    update: (id: string, params: UpdateUserDto) => Promise<UserEntity | 'NOT FOUND'>
    remove: (id: string) => Promise<'DELETED' | 'NOT FOUND'>
}