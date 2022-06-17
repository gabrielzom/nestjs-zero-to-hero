import { ApiProperty } from '@nestjs/swagger';

export class DeleteTaskDto {
  @ApiProperty({ type: 'string', format: 'text' })
  updatedBy: string;
}
