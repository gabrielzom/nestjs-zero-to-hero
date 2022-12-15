import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class CreateUserDto {
  @ApiProperty({ type: 'string', format: 'text' })
  name: string;

  @ApiProperty({ type: 'string', format: 'text' })
  lastName: string;

  @ApiProperty({ type: 'string', format: 'text' })
  email: string;

  @ApiProperty({ type: 'string', format: 'text' })
  password: string;

  @ApiProperty({ type: 'string', format: 'text' })
  confirmPassword: string;

  @ApiProperty({ type: 'string', format: 'text' })
  role: string;
}
