import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class LoginUserDto {
  @ApiProperty({ type: 'string', format: 'text' })
  email: string;

  @ApiProperty({ type: 'string', format: 'text' })
  password: string;
}
