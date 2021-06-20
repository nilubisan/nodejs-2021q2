import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class BColumn {
    
    @PrimaryColumn()
    id: string;

    @Column({
        length: 30
    })
    title: string;

    @Column()
    order: number;

}