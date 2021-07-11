import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, AfterLoad } from 'typeorm';
import * as bcrypt from "bcryptjs"
import * as dotenv from 'dotenv'
dotenv.config();

@Entity({ name: 'User' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 30,
    default: 'username',
    type: 'varchar'
  })
  name: string;

  @Column({
    length: 30,
    type: 'varchar'
  })
  login: string;

  @Column({
    length: 200,
    nullable: true,
    default: '12345',
    type: 'varchar'
  })
  password?: string;

  @BeforeInsert() async hashPassword() {
    this.password = await bcrypt.hash(
      this.password,
      Number(process.env['SALT'])
    );
  }
}