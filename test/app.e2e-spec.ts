import { TaskController } from '../src/task/task.controller';
import { TaskService } from '../src/task/task.service';
import { PrismaService } from 'src/database/PrismaService';
import { Test, TestingModule } from '@nestjs/testing';

describe('Get Task By Id', () => {
  it('get task of database by id', async () => {
    const result = await new TaskController(
      new TaskService(new PrismaService()),
    ).getTaskById('2232');
    expect(result.title).toBe('Titulo');
  });
});
