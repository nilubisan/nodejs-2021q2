import { IsAlphanumeric, Length } from "class-validator";

export class CreateBoardDto {
    @IsAlphanumeric()
    id: string;

    @Length(2,15)
    @IsAlphanumeric()
    title: string;

    columns: Array<{ title: string; order: number }>;
}
