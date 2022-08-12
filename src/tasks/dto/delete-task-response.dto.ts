import { ApiProperty } from '@nestjs/swagger';

export class DeleteTaskResponseDto {
  @ApiProperty({ type: 'string', format: 'uuid' })
  id: string;

  @ApiProperty({ type: 'string', format: 'string' })
  title: string;

  @ApiProperty({ type: 'string', format: 'string' })
  deletedBy: string;

  @ApiProperty({ type: 'string', format: 'date-time' })
  deletedAt: string | Date;
}
