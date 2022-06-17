import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../tasks.model';

export class CreateTaskDto {
  id?: string;

  @ApiProperty({ type: 'string', format: 'text' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ type: 'string', format: 'text' })
  description?: string | null;

  @ApiProperty({ type: 'string', format: 'text' })
  @IsNotEmpty()
  createdBy: string;
}
