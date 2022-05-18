import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters({ status, search }: GetTasksFilterDto): Task[] {
    let tasks = this.getAllTasks();
    if (status)
      tasks = tasks.filter((task) => task.status === status.toUpperCase());

    if (search)
      tasks = tasks.filter(
        (task) =>
          task.description.includes(search.toUpperCase()) ||
          task.title.includes(search.toUpperCase()),
      );
    return tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }

  createTask({ title, description }: CreateTaskDto): Task {
    const task: Task = {
      id: uuid(),
      title: title.toUpperCase(),
      description: description.toUpperCase(),
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const taskToUpdateStatus = this.getTaskById(id);
    taskToUpdateStatus.status = status;
    this.tasks = this.deleteTaskById(id);
    this.tasks.push(taskToUpdateStatus);
    return taskToUpdateStatus;
  }

  deleteTaskById(id: string): Task[] {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return this.tasks;
  }
}
