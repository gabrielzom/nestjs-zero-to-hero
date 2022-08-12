import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class GetAllTasksDto {
  @ApiProperty({ type: 'string', format: 'uuid' })
  id: string;

  @ApiProperty({ type: 'string', format: 'text' })
  title: string;

  @ApiProperty({ type: 'string', format: 'text' })
  description?: string | null;

  @ApiProperty({ type: 'string', format: 'text' })
  status: string;

  @ApiProperty({ type: 'string', format: 'date-time' })
  createdAt?: Date | string;

  @ApiProperty({ type: 'string', format: 'date-time' })
  updatedAt?: Date | string | null;

  @ApiProperty({ type: 'string', format: 'text' })
  createdBy: string;

  @ApiProperty({ type: 'string', format: 'text' })
  updatedBy?: string | null;
}
