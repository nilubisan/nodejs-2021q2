import { IsAlphanumeric, IsInt, Length, IsUUID, IsString } from "class-validator";

export class CreateTaskDto {
    @IsUUID()
    id: string;

    @IsAlphanumeric()
    @Length(5,20)
    title: string;

    @IsInt()
    order: number;

    @IsString()
    @Length(5, 80)
    description: string;

    @IsUUID()
    userId?: string | null;

    @IsUUID()
    boardId: string;

    @IsUUID()
    columnId: string;
}
