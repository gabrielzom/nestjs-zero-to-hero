import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsEnum } from 'class-validator';
import { UserRoleEnum } from '../utils/users.options';

export class CreateUserDto {
  @ApiProperty({ type: 'string', format: 'text', example: 'albert' })
  name: string;

  @ApiProperty({ type: 'string', format: 'text', example: 'einstein' })
  lastName: string;

  @ApiProperty({
    type: 'string',
    format: 'email',
    example: 'albert.einstein@example.com',
  })
  email: string;

  @ApiProperty({ type: 'string', format: 'text', example: 'your_password' })
  password: string;

  @ApiProperty({
    type: 'string',
    format: 'text',
    enum: UserRoleEnum,
  })
  @IsEnum(UserRoleEnum)
  role: UserRoleEnum;
}
