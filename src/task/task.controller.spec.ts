import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { PrismaService } from '../database/PrismaService';

describe('Get Task By Id', () => {
  it('get task of database by id', async () => {
    const result = await new TaskController(
      new TaskService(new PrismaService()),
    ).getTaskById('2232');
    expect(result.title).toBe('Title');
  });
});
