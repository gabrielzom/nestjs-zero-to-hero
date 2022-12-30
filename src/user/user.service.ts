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
import { UserDataManipulate } from './sql/user.data.manipulate';
import { UserDataQuery } from './sql/user.data.query';
import { UserExceptionMessage } from '../../utils/exception/user.exception.message';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private exceptionMessage: UserExceptionMessage,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<CreatedUserDto> {
    if (await this.getUserByEmail(createUserDto.email)) {
      throw new ConflictException(
        this.exceptionMessage.get('EMAIL_ALREADY_IN_USE'),
      );
    }
    if (createUserDto.confirmPassword != createUserDto.password) {
      throw new BadRequestException(
        this.exceptionMessage.get('PASSWORDS_DONT_MATCH'),
      );
    }
    const created = await this.prisma.$executeRawUnsafe(
      UserDataManipulate.createUser(createUserDto),
    );
    try {
      if (created) {
        const user = await this.getUserByEmail(createUserDto.email);
        return {
          creationDatetime: new Date(),
          email: user.email,
          role: user.role,
        };
      }
    } catch (e) {
      throw new Error(this.exceptionMessage.get('ERROR_TO_CREATE_USER', e));
    }
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<unknown> {
    try {
      if (!(await this.getUserByEmail(loginUserDto.email))) {
        throw new BadRequestException(
          this.exceptionMessage.get('USER_DONT_EXIST'),
        );
      }
      const [result]: unknown[] = await this.prisma.$queryRawUnsafe(
        UserDataQuery.verifyPassword(loginUserDto),
      );
      if (!result) {
        throw new BadRequestException(
          this.exceptionMessage.get('INCORRET_PASSWORD'),
        );
      }
      return result;
    } catch (e) {
      throw new BadRequestException(
        this.exceptionMessage.get('ERROR_TO_LOGIN_USER', e),
      );
    }
  }

  async getUsers(): Promise<User[]> {
    try {
      return await this.prisma.user.findMany();
    } catch (e) {
      throw new BadRequestException(
        this.exceptionMessage.get('ERROR_TO_GET_USERS', e),
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
        this.exceptionMessage.get('ERROR_TO_GET_USER', e),
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
        this.exceptionMessage.get('ERROR_TO_GET_USER', e),
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
        this.exceptionMessage.get('ERROR_TO_UPDATE_USER_INFO', e),
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
        this.exceptionMessage.get('ERROR_TO_DELETE_USER', e),
      );
    }
  }
}
