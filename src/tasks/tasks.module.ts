import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { UsersModule } from 'src/users/users.module';
import { Task } from './task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [UsersModule, TypeOrmModule.forFeature([Task])],
})
export class TasksModule {}
