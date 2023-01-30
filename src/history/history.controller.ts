import { IsEnum } from 'class-validator';
import { HistoryService } from 'src/history/history.service';
import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { HistoryOrderEnum } from 'utils/enums';
import { History } from '@prisma/client';
import { ApiQuery } from '@nestjs/swagger/dist/decorators';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @ApiQuery({
    name: 'type',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'className',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'createdBy',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'orderBy',
    enum: HistoryOrderEnum,
    required: true,
    enumName: 'HistoryOrder',
    type: String,
  })
  @Get()
  async getHistory(
    @Query('type') type: string,
    @Query('className') className: string,
    @Query('createdBy', ParseIntPipe) createdBy: number,
    @Query('orderBy') orderBy: string,
  ): Promise<History[]> {
    return this.historyService.getHistory(type, className, createdBy, orderBy);
  }

  @Get(':id') getHistoryById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<History> {
    return this.historyService.getHistoryById(id);
  }
}
