import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskResponseDto {
  @ApiProperty({ type: 'string', format: 'uuid' })
  id: string;

  @ApiProperty({ type: 'string', format: 'text' })
  status: string;

  @ApiProperty({ type: 'string', format: 'date-time' })
  createdAt: string | Date;
}
