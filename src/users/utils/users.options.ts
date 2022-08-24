import { BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreateUserResponseDto } from '../dto/create-user-response.dto';
import { CreateUserDto } from '../dto/create-user.dto';

export enum UserRoleEnum {
  ADMIN = 'ADMIN',
  OPERATOR = 'OPERATOR',
  FINAL_USER = 'FINAL_USER',
}

export async function executeInsertUser(
  prisma: PrismaService,
  createUserDto: CreateUserDto,
): Promise<CreateUserResponseDto> {
  const created =
    await prisma.$executeRawUnsafe(`INSERT INTO tab_users (name, last_name, email, password, role) 
        VALUES (
          '${createUserDto.name}',
          '${createUserDto.lastName}',
          '${createUserDto.email}',
          AES_ENCRYPT('${createUserDto.password}', 'nest'),
          '${createUserDto.role}'
        );`);

  if (!!created) {
    const response: CreateUserResponseDto[] = await prisma.$queryRawUnsafe(
      `SELECT id, email, role FROM tab_users WHERE email = '${createUserDto.email}' AND (SELECT CAST(AES_DECRYPT(password, 'nest') AS CHAR)) = '${createUserDto.password}';`,
    );
    if (response) {
      return {
        id: response[0].id,
        email: response[0].email,
        role: response[0].role,
      };
    } else {
      throw new BadRequestException('user not founded after created');
    }
  } else {
    throw new BadRequestException('user not created');
  }
}
