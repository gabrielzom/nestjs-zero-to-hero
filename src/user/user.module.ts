import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/database/PrismaService';
import { UserExceptionMessage } from 'utils/exception/user.exception.message';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, UserExceptionMessage],
})
export class UserModule {}
