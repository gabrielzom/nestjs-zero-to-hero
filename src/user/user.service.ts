import { HistoryService } from './../history/history.service';
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
import { HistoryTypeEnum } from 'utils/enums';

@Injectable()
export class UserService {
  className = 'user';
  constructor(
    private readonly prisma: PrismaService,
    private readonly history: HistoryService,
  ) {}
  async createUser(
    userCreate: UserCreateDto,
    bearerToken: string,
  ): Promise<UserRetrieveDto> {
    if (await this.getUserByEmail(userCreate.email, bearerToken)) {
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
        const userRetrieve = UserRetrieveDto.parse(user);
        this.history.addHistory(
          HistoryTypeEnum.CREATE,
          this.className,
          userRetrieve,
          bearerToken,
        );
        return userRetrieve;
      }
    } catch (e) {
      this.history.addHistory(
        HistoryTypeEnum.CREATE,
        this.className,
        e,
        bearerToken,
      );
      throw new BadRequestException(
        new UserExceptionMessage().get('ERROR_CREATE_USER', e),
      );
    }
  }

  async loginUser(userLogin: UserLoginDto): Promise<User> {
    const user = await this.getUserByEmail(userLogin.email, null);
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
      this.history.addHistory(
        HistoryTypeEnum.SIGNIN,
        this.className,
        UserRetrieveDto.parse(user),
        'system',
      );
      return user;
    } catch (e) {
      this.history.addHistory(
        HistoryTypeEnum.SIGNIN,
        this.className,
        e,
        'system',
      );
      throw new BadRequestException(
        new UserExceptionMessage().get('ERROR_LOGIN_USER', e),
      );
    }
  }

  async getUsers(
    email: string,
    name: string,
    lastName: string,
    bearerToken: string,
  ): Promise<UserRetrieveDto[]> {
    try {
      const users = UserRetrieveDto.parseList(
        await this.prisma.user.findMany(
          UserDataQuery.getUsersORM(email, name, lastName),
        ),
      );
      this.history.addHistory(
        HistoryTypeEnum.SIGNIN,
        this.className,
        users,
        bearerToken,
        [email, name, lastName],
      );
      return users;
    } catch (e) {
      this.history.addHistory(
        HistoryTypeEnum.SIGNIN,
        this.className,
        e,
        bearerToken,
      );
      throw new BadRequestException(
        new UserExceptionMessage().get('ERROR_GET_USERS', e),
      );
    }
  }

  async getUserById(id: number, bearerToken: string): Promise<UserRetrieveDto> {
    try {
      const user = UserRetrieveDto.parse(
        await this.prisma.user.findUnique({
          where: {
            id: id,
          },
        }),
      );
      this.history.addHistory(
        HistoryTypeEnum.SIGNIN,
        this.className,
        user,
        bearerToken,
      );
      return user;
    } catch (e) {
      this.history.addHistory(
        HistoryTypeEnum.SIGNIN,
        this.className,
        e,
        bearerToken,
      );
      throw new BadRequestException(
        new UserExceptionMessage().get('ERROR_GET_USER', e),
      );
    }
  }

  async getUserByEmail(email: string, bearerToken: string): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });
      this.history.addHistory(
        HistoryTypeEnum.SIGNIN,
        this.className,
        UserRetrieveDto.parse(user),
        bearerToken,
      );
      return user;
    } catch (e) {
      this.history.addHistory(
        HistoryTypeEnum.SIGNIN,
        this.className,
        e,
        bearerToken,
      );
      throw new BadRequestException(
        new UserExceptionMessage().get('ERROR_GET_USER', e),
      );
    }
  }

  async updateUser(
    id: number,
    userUpdate: UserUpdateDto,
    bearerToken: string,
  ): Promise<UserRetrieveDto> {
    try {
      const user = UserRetrieveDto.parse(
        await this.prisma.user.update({
          where: {
            id,
          },
          data: {
            name: userUpdate.name,
            lastName: userUpdate.lastName,
            email: userUpdate.email,
            role: userUpdate.role,
          },
        }),
      );
      this.history.addHistory(
        HistoryTypeEnum.UPDATE,
        this.className,
        user,
        bearerToken,
      );
      return user;
    } catch (e) {
      this.history.addHistory(
        HistoryTypeEnum.UPDATE,
        this.className,
        e,
        bearerToken,
      );
      throw new BadRequestException(
        new UserExceptionMessage().get('ERROR_UPDATE_USER', e),
      );
    }
  }

  async deleteUser(id: number, bearerToken: string): Promise<UserDeletedDto> {
    try {
      const user = UserDeletedDto.parse(
        await this.prisma.user.delete({
          where: {
            id,
          },
        }),
      );
      this.history.addHistory(
        HistoryTypeEnum.DELETE,
        this.className,
        user,
        bearerToken,
      );
      return user;
    } catch (e) {
      this.history.addHistory(
        HistoryTypeEnum.DELETE,
        this.className,
        e,
        bearerToken,
      );
      throw new BadRequestException(
        new UserExceptionMessage().get('ERROR_DELETE_USER', e),
      );
    }
  }
}
