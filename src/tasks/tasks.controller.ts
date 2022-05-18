import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() getTasksFilterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(getTasksFilterDto).length) {
      return this.tasksService.getTasksWithFilters(getTasksFilterDto);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    console.log(createTaskDto);
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch('/:id/update-status/')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() { status }: UpdateTaskStatusDto,
  ): Task {
    console.log(status);
    return this.tasksService.updateTaskStatus(id, status);
  }

  @Delete('/delete/:id')
  deleteTaskById(@Param('id') id: string): Task[] {
    return this.tasksService.deleteTaskById(id);
  }
}
