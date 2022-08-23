import { TasksController } from '../src/tasks/tasks.controller';
import { TasksService } from '../src/tasks/tasks.service';
import { PrismaService } from 'src/database/PrismaService';
import { Test, TestingModule } from '@nestjs/testing';

describe('Get Task By Id', () => {
  it('get task of database by id', async () => {
    const result = await new TasksController(
      new TasksService(new PrismaService()),
    ).getTaskById('2232');
    expect(result.title).toBe('Titulo');
  });
});
