import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsEmail } from 'class-validator';

export class UserRetrieveDto {
  @ApiProperty({ type: 'string', format: 'text' })
  name: string;

  @ApiProperty({ type: 'string', format: 'text' })
  lastName: string;

  @IsEmail()
  @ApiProperty({ type: 'string', format: 'email' })
  email: string;

  @ApiProperty({ type: 'string', format: 'text' })
  role: string;

  static parse(user: User): UserRetrieveDto {
    const { password, iv, ...userRetrieve } = user;
    return userRetrieve;
  }

  static parseList(users: User[]): UserRetrieveDto[] {
    return users.map((user) => {
      const { iv, password, ...userRetrieve } = user;
      return userRetrieve;
    });
  }
}
