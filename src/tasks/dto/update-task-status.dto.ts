import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { TaskStatus } from '../tasks.model';

export class UpdateTaskStatusDto {
  @ApiProperty({ type: 'string', format: 'text' })
  @IsEnum(TaskStatus)
  newStatus: TaskStatus;

  @ApiProperty({ type: 'number', format: 'number' })
  updatedBy: number;
}
