import { ApiProperty } from '@nestjs/swagger';

export class DeleteTaskResponseDto {
  @ApiProperty({ type: 'string', format: 'text' })
  id: string;

  @ApiProperty({ type: 'string', format: 'text' })
  title: string;

  @ApiProperty({ type: 'string', format: 'text' })
  deletedBy: string;

  @ApiProperty({ type: 'string | Date', format: 'text' })
  deletedAt: string | Date;
}
