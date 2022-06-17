import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskStatusResponseDto {
  @ApiProperty({ type: 'string', format: 'text' })
  id: string;

  @ApiProperty({ type: 'string', format: 'text' })
  status: string;

  @ApiProperty({ type: 'string | Date', format: 'text' })
  updatedAt: string | Date;
}
