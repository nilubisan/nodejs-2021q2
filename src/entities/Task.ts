import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Task' })
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 30,
  })
  title: string;

  @Column()
  order: number;

  @Column({
    length: 60,
  })
  description: string;

  @Column({
    nullable: true,
    type: 'text',
  })
  userId?: string | null;

  @Column({ nullable: true })
  boardId: string;

  @Column({ nullable: true })
  columnId: string;
}
