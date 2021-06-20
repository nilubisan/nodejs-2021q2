import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class BColumn {
    
    @PrimaryColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    order: number;

}