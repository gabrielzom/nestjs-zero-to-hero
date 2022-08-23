import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from '@prisma/client';
import { PrismaService } from '../database/PrismaService';
import { CreateTaskResponseDto } from './dto/create-task-response-dto';
import { UpdateTaskStatusResponseDto } from './dto/update-task-status-response.dto';
import { DeleteTaskResponseDto } from './dto/delete-task-response.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async getTasks(status: string, description: string): Promise<Task[]> {
    try {
      if (description && status) {
        return await this.prisma.task.findMany({
          where: {
            description: {
              startsWith: description,
            },
            AND: {
              status: {
                startsWith: status,
              },
            },
          },
        });
      } else if (description && !status) {
        return await this.prisma.task.findMany({
          where: {
            description: {
              startsWith: description,
            },
          },
        });
      } else if (status && !description) {
        return await this.prisma.task.findMany({
          where: {
            status: {
              startsWith: status,
            },
          },
        });
      } else {
        return await this.prisma.task.findMany();
      }
    } catch (e) {
      console.error(e);
      throw new BadRequestException(
        `There has been an error. The query was not possible`,
      );
    }
  }

  async getTaskById(id: string): Promise<Task> {
    const taskFoundById = await this.prisma.task.findUnique({
      where: {
        id,
      },
    });

    if (!taskFoundById) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return taskFoundById;
  }

  async createTask(data: CreateTaskDto): Promise<CreateTaskResponseDto> {
    const taskWithThisTitleExist = await this.prisma.task.findFirst({
      where: {
        title: data.title,
      },
    });
    if (taskWithThisTitleExist) {
      throw new ConflictException(
        'One task with this title alredy was created',
      );
    } else {
      const { id, status, createdAt } = await this.prisma.task.create({
        data: {
          title: data.title,
          description: data.description,
          project: data.project,
          createdBy: 0,
        },
      });
      return { id, status, createdAt };
    }
  }

  async updateTaskStatus(
    taskId: string,
    newStatus: TaskStatus,
    updatedBy: number,
  ): Promise<UpdateTaskStatusResponseDto> {
    if (await this.getTaskById(taskId)) {
      const { id, status, updatedAt }: UpdateTaskStatusResponseDto =
        await this.prisma.task.update({
          data: {
            status: newStatus,
            updatedBy,
            updatedAt: new Date(),
          },
          where: {
            id: taskId,
          },
        });
      return { id, status, updatedAt };
    }
  }

  async deleteTaskById(
    id: string,
    deletedBy: string,
  ): Promise<DeleteTaskResponseDto> {
    if (await this.getTaskById(id)) {
      const { title } = await this.prisma.task.delete({
        where: {
          id,
        },
      });
      return { id, title, deletedBy, deletedAt: new Date() };
    }
  }
}
