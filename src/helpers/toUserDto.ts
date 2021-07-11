import { UserDto } from "src/users/dto/user.dto";
import { UserEntity } from "src/users/entities/user.entity";

export const toUserDto = (data: UserEntity): UserDto => {
    const { id, name, login } = data;
    return { id, name, login}
}