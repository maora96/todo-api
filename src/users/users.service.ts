import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async findOneById(id: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async create(createUserDTO: CreateUserDTO): Promise<User> {
    const { username, password } = createUserDTO;

    const existingUser = await this.findOne(username);

    if (existingUser) {
      throw new ForbiddenException('Usuário já existe.');
    }

    const user = new User(username, password);

    return this.usersRepository.save(user);
  }
}
