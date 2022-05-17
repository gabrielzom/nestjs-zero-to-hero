import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';

interface Response {
  status: number;
  message: string;
}

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Response {
    this.tasksService.createTask(createTaskDto);
    console.log('LOG ---> Task created succefully');
    return {
      status: 201,
      message: 'Task created succefully',
    };
  }

  @Delete('/delete/:id')
  deleteTaskById(@Param('id') id: string): Task[] {
    console.log('LOG ---> Task deleted succefully');
    return this.tasksService.deleteTaskById(id);
  }
}
