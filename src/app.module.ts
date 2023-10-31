import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TaskModule } from './task/task.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [UsersModule, TaskModule, TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}