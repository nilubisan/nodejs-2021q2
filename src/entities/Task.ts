import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity({name: "Task"})
export class Task {
    
    @PrimaryColumn()
    id: string;

    @Column({
        length: 30
    })
    title: string;

    @Column()
    order: number;

    @Column({
        length: 60
    })
    description: string;

    @Column()
    userId: string;

    @Column()
    boardId: string;

    @Column()
    columnId: string;

}
