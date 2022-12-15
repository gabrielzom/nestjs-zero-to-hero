import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as process from 'process';
import { CreatedUserDto } from './dto/created-user.dto';
import { emailIsValid } from '../../helpers/validation';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto): Promise<CreatedUserDto> {
    if (!emailIsValid(createUserDto.email)) {
      throw new HttpException('The informed e-mail is invalid. ', 406);
    }
    if (await this.getUserByEmail(createUserDto.email)) {
      throw new ConflictException('User with this e-mail already exists. ');
    }
    if (createUserDto.confirmPassword != createUserDto.password) {
      throw new BadRequestException('The passwords not equals. ');
    }
    const createdUserDto = new CreatedUserDto();
    const created = await this.prisma.$executeRawUnsafe(
      `INSERT INTO tab_users (
        name, 
        last_name, 
        email, 
        role,
        password 
      ) VALUES (
        '${createUserDto.name.toUpperCase()}',
        '${createUserDto.lastName.toUpperCase()}',
        '${createUserDto.email.toLowerCase()}',
        '${createUserDto.role}',
        AES_ENCRYPT(
          '${createUserDto.password}', 
          '${process.env.AES_KEY}'
        )
      )`,
    );
    createdUserDto.creationDatetime = new Date();
    if (created) {
      const user = await this.getUserByEmail(createUserDto.email);
      createdUserDto.role = user.role;
      createdUserDto.email = user.email;
      return createdUserDto;
    } else {
      throw new Error('An error occurred where try recovery user created. ');
    }
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<unknown> {
    if (!emailIsValid(loginUserDto.email)) {
      throw new BadRequestException('The informed e-mail is invalid. ');
    }
    if (!(await this.getUserByEmail(loginUserDto.email))) {
      throw new BadRequestException('This user are not exists. ');
    }
    const result: unknown[] = await this.prisma.$queryRawUnsafe(
      `
      SELECT 
        name,
        last_name AS lastName,
        email, 
        role,
        password
      FROM tab_users 
      WHERE 
        CAST(
          AES_DECRYPT(
            password, 
            '${process.env.AES_KEY}'
          ) AS CHAR
        ) = '${loginUserDto.password}'
      AND email = '${loginUserDto.email}'
    `,
    );
    if (!result.length) {
      throw new BadRequestException('Incorrect password. ');
    }
    return result[0];
  }

  async getUsers() {
    return await this.prisma.user.findMany();
  }

  async getUserById(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  updateUser(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        name: updateUserDto.name,
        lastName: updateUserDto.lastName,
        email: updateUserDto.email,
        role: updateUserDto.role,
      },
    });
  }

  async deleteUser(id: number) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
