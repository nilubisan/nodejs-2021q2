import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Board' })
export class BoardEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 30,
  })
  title: string;

  @Column('json', { nullable: true })
  columns: Array<{ title: string; order: number }>;
}

