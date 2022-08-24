import { ApiProperty } from '@nestjs/swagger';

export class CreateUserResponseDto {
  @ApiProperty({ type: 'number', format: 'number', example: 999 })
  id: number;

  @ApiProperty({
    type: 'string',
    format: 'email',
    example: 'albert.einstein@example.com',
  })
  email: string;

  @ApiProperty({ type: 'string', format: 'text', example: 'ADMIN' })
  role: string;
}
