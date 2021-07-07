import { IsAlphanumeric, isAlphanumeric, IsInt, isInt, IsUUID, Length } from "class-validator";

export class CreateUserDto {
    @IsUUID()
    id: string;

    @Length(2,15)
    @IsAlphanumeric()
    name: string;

    @Length(2,15)
    @IsAlphanumeric()
    login: string;

    @Length(6,15)
    password: string;
}
