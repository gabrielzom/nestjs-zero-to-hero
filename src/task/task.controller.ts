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
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { CreateTaskResponseDto } from './dto/create-task-response.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from '@prisma/client';
import { ApiBody, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { GetAllTasksDto } from './dto/get-all-tasks.dto';
import { UpdateTaskStatusResponseDto } from './dto/update-task-status-response.dto';
import { DeleteTaskResponseDto } from './dto/delete-task-response.dto';
import { DeleteTaskDto } from './dto/delete-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({ summary: 'Endpoint for get task' })
  @ApiResponse({
    status: 200,
    type: GetAllTasksDto,
    description: 'Tasks returneds',
    isArray: true,
  })
  @ApiResponse({
    status: 400,
    description: 'There has been an error. The query was not possible',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'description',
    required: false,
    type: String,
  })
  @Get()
  getTasks(
    @Query('status') status: string,
    @Query('description') description: string,
  ): Promise<Task[]> {
    return this.taskService.getTasks(status, description);
  }

  @ApiOperation({ summary: 'Endpoint for get task by id' })
  @ApiResponse({
    status: 200,
    type: GetAllTasksDto,
    description: 'Task returned',
  })
  @ApiResponse({ status: 404, description: 'Task with informed id not found' })
  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @ApiOperation({ summary: 'Endpoint for create task' })
  @ApiResponse({
    status: 201,
    type: CreateTaskResponseDto,
    description: 'Task created',
  })
  @ApiResponse({ status: 409, description: 'Task alredy exists' })
  @ApiResponse({ status: 400, description: 'If the status type is invalid' })
  @ApiBody({ description: 'Data of task', type: CreateTaskDto })
  @Post()
  createTask(@Body() data: CreateTaskDto): Promise<CreateTaskResponseDto> {
    return this.taskService.createTask(data);
  }

  @ApiOperation({ summary: 'Endpoint for update task status' })
  @ApiResponse({
    status: 200,
    type: UpdateTaskStatusResponseDto,
    description: 'Task that was updated',
  })
  @ApiResponse({
    status: 404,
    description: 'Task with informed id not found',
  })
  @ApiResponse({
    status: 400,
    description: 'If the status type is invalid',
  })
  @Patch('/:id/update-status/')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() { newStatus, updatedBy }: UpdateTaskStatusDto,
  ): Promise<UpdateTaskStatusResponseDto> {
    return this.taskService.updateTaskStatus(id, newStatus, updatedBy);
  }

  @ApiOperation({ summary: 'Endpoint for delete task by id' })
  @ApiResponse({
    status: 200,
    type: DeleteTaskResponseDto,
    description: 'Task that was deleted',
  })
  @ApiResponse({ status: 404, description: 'Task with informed id not found' })
  @Delete('/:id')
  deleteTask(
    @Param('id') id: string,
    @Body() { updatedBy }: DeleteTaskDto,
  ): Promise<DeleteTaskResponseDto> {
    return this.taskService.deleteTask(id, updatedBy);
  }
}
