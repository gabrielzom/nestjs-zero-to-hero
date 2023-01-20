import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsEmail } from 'class-validator';

export class UserDeletedDto {
  @ApiProperty({ type: 'number', format: 'number' })
  id: number;

  @IsEmail()
  @ApiProperty({ type: 'string', format: 'email' })
  email: string;

  @ApiProperty({ type: 'boolean', format: 'boolean' })
  deleted: boolean;
}
