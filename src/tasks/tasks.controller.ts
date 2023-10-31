import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dtos/create-task.dto';
import { EditTaskDTO } from './dtos/edit-task.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  async create(@Body() body: CreateTaskDTO) {
    const content = await this.tasksService.create(body);

    return { result: content };
  }

  @Get('/:id')
  async getOne(@Param('id') id: string) {
    const content = await this.tasksService.getOne(id);
    return { result: content };
  }

  @Get('/user/:userId')
  async getMany(@Param('userId') userId: string) {
    const content = await this.tasksService.getManyByUserId(userId);
    return { result: content };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const content = await this.tasksService.delete(id);

    return { result: content };
  }

  @Patch(':id')
  async edit(@Param('id') id: string, @Body() body: EditTaskDTO) {
    const content = await this.tasksService.edit(id, body);

    return { result: content };
  }
}
