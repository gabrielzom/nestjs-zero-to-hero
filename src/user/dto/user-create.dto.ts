import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsEmail, IsEnum } from 'class-validator';
import { UserRoleEnum } from 'utils/enums';

export class UserCreateDto {
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

  @IsEnum(UserRoleEnum)
  @ApiProperty({ type: 'string', format: 'text' })
  role: string;
}
