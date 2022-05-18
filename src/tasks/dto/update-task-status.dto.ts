import { TaskStatus } from '../tasks.model';

export class UpdateTaskStatusDto {
  id: string;
  status: TaskStatus;
}
