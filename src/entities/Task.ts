import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Task {
    
    @PrimaryColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    order: number;

    @Column()
    description: string;

    @Column()
    userId: string;

    @Column()
    boardId: string;

    @Column()
    columnId: string;

}
