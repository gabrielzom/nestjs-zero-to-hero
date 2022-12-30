import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ type: 'string', format: 'text' })
  name: string;

  @ApiProperty({ type: 'string', format: 'text' })
  lastName: string;

  @IsEmail()
  @ApiProperty({ type: 'string', format: 'email' })
  email: string;

  @ApiProperty({ type: 'string', format: 'text' })
  password: string;

  @ApiProperty({ type: 'string', format: 'text' })
  confirmPassword: string;

  @ApiProperty({ type: 'string', format: 'text' })
  role: string;
}
