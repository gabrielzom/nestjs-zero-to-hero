import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';
import { aesEncrypt, aesDecrypt } from '../../helpers';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { UserCreateDto } from './dto/user-create.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { UserRetrieveDto } from './dto/user-retrieve.dto';
import { User } from '@prisma/client';
import { UserDataQuery } from './sql/user.data.query';
import { UserExceptionMessage } from '../../utils/exception/user.exception.message';
import * as crypto from 'crypto';
import { UserDeletedDto } from './dto/user-deleted.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async createUser(userCreate: UserCreateDto): Promise<UserRetrieveDto> {
    if (await this.getUserByEmail(userCreate.email)) {
      throw new ConflictException(new UserExceptionMessage().get('USER_EXIST'));
    }
    if (userCreate.confirmPassword != userCreate.password) {
      throw new BadRequestException(
        new UserExceptionMessage().get('PASS_DONT_MATCH'),
      );
    }
    const iv: Buffer = crypto.randomBytes(16);
    const password: Buffer = aesEncrypt(userCreate.password, iv);
    const user = await this.prisma.user.create({
      data: {
        name: userCreate.name,
        lastName: userCreate.lastName,
        email: userCreate.email,
        password,
        iv,
        role: userCreate.role,
      },
    });
    try {
      if (user) {
        return UserRetrieveDto.parse(user);
      }
    } catch (e) {
      throw new BadRequestException(
        new UserExceptionMessage().get('ERROR_CREATE_USER', e),
      );
    }
  }

  async loginUser(userLogin: UserLoginDto): Promise<User> {
    const user: User = await this.getUserByEmail(userLogin.email);
    if (!user) {
      throw new BadRequestException(
        new UserExceptionMessage().get('USER_DONT_EXIST'),
      );
    }
    if (aesDecrypt(user.password, user.iv) !== userLogin.password) {
      throw new UnauthorizedException(
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
  ): Promise<UserRetrieveDto[]> {
    try {
      const users = await this.prisma.user.findMany(
        UserDataQuery.getUsersORM(email, name, lastName),
      );
      return UserRetrieveDto.parseList(users);
    } catch (e) {
      throw new BadRequestException(
        new UserExceptionMessage().get('ERROR_GET_USERS', e),
      );
    }
  }

  async getUserById(id: number): Promise<UserRetrieveDto> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });
      return UserRetrieveDto.parse(user);
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

  async updateUser(
    id: number,
    userUpdate: UserUpdateDto,
  ): Promise<UserRetrieveDto> {
    try {
      const user = await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          name: userUpdate.name,
          lastName: userUpdate.lastName,
          email: userUpdate.email,
          role: userUpdate.role,
        },
      });
      return UserRetrieveDto.parse(user);
    } catch (e) {
      throw new BadRequestException(
        new UserExceptionMessage().get('ERROR_UPDATE_USER', e),
      );
    }
  }

  async deleteUser(id: number): Promise<UserDeletedDto> {
    try {
      const user: User = await this.prisma.user.delete({
        where: {
          id,
        },
      });
      return UserDeletedDto.parse(user);
    } catch (e) {
      throw new BadRequestException(
        new UserExceptionMessage().get('ERROR_DELETE_USER', e),
      );
    }
  }
}
