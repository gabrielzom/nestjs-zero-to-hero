import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskResponseDto {
  @ApiProperty({ type: 'string', format: 'text' })
  id: string;

  @ApiProperty({ type: 'string', format: 'text' })
  status: string;

  @ApiProperty({ type: 'string | Date', format: 'text' })
  createdAt: string | Date;
}
