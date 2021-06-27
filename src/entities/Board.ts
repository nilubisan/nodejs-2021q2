import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Board' })
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 30,
  })
  title: string;

  @Column('json', { nullable: true })
  columns: Array<{ title: string; order: number }>;
}
