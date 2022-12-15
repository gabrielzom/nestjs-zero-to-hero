import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class CreatedUserDto {
  @ApiProperty({ type: 'string', format: 'text' })
  email: string;

  @ApiProperty({ type: 'string', format: 'text' })
  role: string;

  @ApiProperty({ type: 'string', format: 'date-time' })
  creationDatetime: Date;
}
