import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDTO } from './dtos/create-task.dto';
import { UsersService } from 'src/users/users.service';
import { EditTaskDTO } from './dtos/edit-task.dto';

@Injectable()
export class TasksService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDTO: CreateTaskDTO) {
    const { title, description, isConcluded, concludedAt, userId } =
      createTaskDTO;

    const user = await this.usersService.findOneById(userId);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    const task = new Task(title, description, user, concludedAt, isConcluded);

    return this.taskRepository.save(task);
  }

  async getOne(id: string) {
    const task = await this.taskRepository.findOne({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException('User not found');
    }

    return task;
  }

  async getManyByUserId(userId: string) {
    const tasks = await this.taskRepository.find({ relations: { user: true } });

    const filteredTasks = tasks.filter((task: Task) => {
      return task.user.id === userId;
    });

    return filteredTasks;
  }

  async delete(id: string) {
    const task = await this.taskRepository.findOne({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException('Tarefa não encontrada');
    }
    return this.taskRepository.remove(task);
  }

  async edit(id: string, editTaskDTO: EditTaskDTO) {
    const task = await this.taskRepository.findOne({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException('Tarefa não encontrada.');
    }

    task.edit(editTaskDTO);

    return this.taskRepository.save(task);
  }
}
