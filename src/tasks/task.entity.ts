import { User } from 'src/users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { EditTaskDTO } from './dtos/edit-task.dto';

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

  @Column({
    nullable: true,
  })
  concludedAt: Date;

  @Column({ default: false })
  isConcluded: boolean;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;

  constructor(
    title: string,
    description: string,
    user: User,
    concludedAt?: Date,
    isConcluded?: boolean,
    createdAt?: Date | null,
    id?: string,
  ) {
    this.id = id ?? uuid();
    this.title = title;
    this.description = description;
    this.user = user;
    this.createdAt = createdAt ?? new Date();
    this.isConcluded = isConcluded ?? false;
    this.concludedAt = concludedAt ?? null;
  }

  edit(editTaskDTO: EditTaskDTO) {
    this.title = editTaskDTO.title ?? this.title;
    this.description = editTaskDTO.description ?? this.description;
    this.isConcluded = editTaskDTO.isConcluded ?? this.isConcluded;
    this.concludedAt = editTaskDTO.concludedAt ?? this.concludedAt;
  }
}
