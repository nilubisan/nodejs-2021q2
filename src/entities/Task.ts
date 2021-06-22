import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "Task"})
export class Task {
    @PrimaryGeneratedColumn('uuid')
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

    @Column({
        nullable: true,
        type: 'text'
    })
    userID?: string | null;

    @Column()
    boardID: string;

    @Column()
    columnID: string;

}
