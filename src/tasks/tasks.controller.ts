import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Post()
  createTask(@Body() task: Task): Task {
    console.log('Created task ---> ', task);
    const { title, description } = task;
    return this.tasksService.createTask(title, description);
  }
}
