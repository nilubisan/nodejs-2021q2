import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class User {
    
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    login: string;

    @Column()
    password: string;

}
