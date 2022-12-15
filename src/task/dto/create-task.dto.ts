import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  id?: string;

  @ApiProperty({ type: 'string', format: 'text' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ type: 'string', format: 'text' })
  description?: string | null;

  @ApiProperty({ type: 'string', format: 'text' })
  @IsNotEmpty()
  createdBy: number;

  @ApiProperty({ type: 'number', format: 'number' })
  @IsNotEmpty()
  project: number;
}
