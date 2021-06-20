import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class User {
    
    @PrimaryColumn()
    id: string;

    @Column({
        length: 30
    })
    name: string;

    @Column({
        length: 30
    })
    login: string;

    @Column({
        length: 30
    })
    password: string;

}
