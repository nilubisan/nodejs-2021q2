import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Board {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    columns: string;
}