import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/PrismaService';
import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';

@Module({
  providers: [HistoryService, PrismaService, JwtService],
  exports: [HistoryService],
  controllers: [HistoryController],
})
export class HistoryModule {}
