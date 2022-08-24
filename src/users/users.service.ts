import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { executeInsertUser } from './utils/users.options';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto): Promise<unknown> {
    return executeInsertUser(this.prisma, createUserDto);
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<unknown> {
    const result = await this.prisma.$queryRawUnsafe(`
      SELECT name, last_name, email, role from tab_users WHERE 
        PWDCOMPARE(
          '${loginUserDto.password}', 
          (SELECT password FROM tab_users WHERE email = '${loginUserDto.email}')
        ) = 1 AND email = '${loginUserDto.email}';
    `);

    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
