import { User } from 'src/users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @Column()
  concludedAt: Date;

  @Column()
  isConcluded: boolean;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
