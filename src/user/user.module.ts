import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/database/PrismaService';
import { HistoryService } from 'src/history/history.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, HistoryService, JwtService],
  exports: [UserService],
})
export class UserModule {}
