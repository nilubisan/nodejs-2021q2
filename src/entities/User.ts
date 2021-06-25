import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "User"})
export class User {
    
    @PrimaryGeneratedColumn('uuid')
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
        length: 200,
        nullable: true
    })
    password: string;

}
