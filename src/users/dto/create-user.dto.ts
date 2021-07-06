import { IsAlphanumeric, isAlphanumeric, IsInt, isInt, Length } from "class-validator";

export class CreateUserDto {
    @IsAlphanumeric()
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
