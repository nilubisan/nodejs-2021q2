import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Board {

    @PrimaryColumn()
    id: string;

    @Column({
        length: 30
    })
    name: string;

    @Column()
    columns: string;
}