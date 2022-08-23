import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { PrismaService } from '../database/PrismaService';

describe('Get Task By Id', () => {
  it('get task of database by id', async () => {
    const result = await new TasksController(
      new TasksService(new PrismaService()),
    ).getTaskById('2232');
    expect(result.title).toBe('Title');
  });
});
