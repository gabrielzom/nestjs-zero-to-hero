import { aesEncrypt, aesDecrypt } from '../../helpers';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreatedUserDto } from './dto/created-user.dto';
import { User } from '@prisma/client';
import { UserDataQuery } from './sql/user.data.query';
import { UserExceptionMessage } from '../../utils/exception/user.exception.message';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async createUser(createUserDto: CreateUserDto): Promise<CreatedUserDto> {
    if (await this.getUserByEmail(createUserDto.email)) {
      throw new ConflictException(new UserExceptionMessage().get('USER_EXIST'));
    }
    if (createUserDto.confirmPassword != createUserDto.password) {
      throw new BadRequestException(
        new UserExceptionMessage().get('PASS_DONT_MATCH'),
      );
    }
    const iv: Buffer = crypto.randomBytes(16);
    const password: Buffer = aesEncrypt(createUserDto.password, iv);
    const createdUser = await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        lastName: createUserDto.lastName,
        email: createUserDto.email,
        password,
        iv,
        role: createUserDto.role,
      },
    });
    try {
      if (createdUser) {
        return {
          creationDatetime: new Date(),
          email: createdUser.email,
          role: createdUser.role,
        };
      }
    } catch (e) {
      throw new BadRequestException(
        new UserExceptionMessage().get('ERROR_CREATE_USER', e),
      );
    }
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<User> {
    const user: User = await this.getUserByEmail(loginUserDto.email);
    if (!user) {
      throw new BadRequestException(
        new UserExceptionMessage().get('USER_DONT_EXIST'),
      );
    }
    if (
      aesDecrypt(user.password.toString('hex'), user.iv.toString('hex')) !==
      loginUserDto.password
    ) {
      throw new BadRequestException(
        new UserExceptionMessage().get('INCORRET_PASS'),
      );
    }
    try {
      return user;
    } catch (e) {
      throw new BadRequestException(
        new UserExceptionMessage().get('ERROR_LOGIN_USER', e),
      );
    }
  }

  async getUsers(
    email: string,
    name: string,
    lastName: string,
  ): Promise<User[]> {
    try {
      return await this.prisma.user.findMany(
        UserDataQuery.getUsersORM(email, name, lastName),
      );
    } catch (e) {
      throw new BadRequestException(
        new UserExceptionMessage().get('ERROR_GET_USERS', e),
      );
    }
  }

  async getUserById(id: number): Promise<User> {
    try {
      return await this.prisma.user.findUnique({
        where: {
          id,
        },
      });
    } catch (e) {
      throw new BadRequestException(
        new UserExceptionMessage().get('ERROR_GET_USER', e),
      );
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    try {
      return await this.prisma.user.findUnique({
        where: {
          email,
        },
      });
    } catch (e) {
      throw new BadRequestException(
        new UserExceptionMessage().get('ERROR_GET_USER', e),
      );
    }
  }

  updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
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
    } catch (e) {
      throw new BadRequestException(
        new UserExceptionMessage().get('ERROR_UPDATE_USER', e),
      );
    }
  }

  async deleteUser(id: number): Promise<User> {
    try {
      return this.prisma.user.delete({
        where: {
          id,
        },
      });
    } catch (e) {
      throw new BadRequestException(
        new UserExceptionMessage().get('ERROR_DELETE_USER', e),
      );
    }
  }
}
