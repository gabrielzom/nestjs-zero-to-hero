import { HistoryService } from 'src/history/history.service';
import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { EntityEnum, HistoryOrderEnum, HistoryTypeEnum, OrderTypeEnum } from 'utils/enums';
import { History } from '@prisma/client';
import { ApiQuery } from '@nestjs/swagger/dist/decorators';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @ApiQuery({
    name: 'type',
    required: false,
    enum: HistoryTypeEnum,
    type: String,
  })
  @ApiQuery({
    name: 'entity',
    enum: EntityEnum,
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
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'orderType',
    enum: OrderTypeEnum,
    required: false,
    type: String,
  })
  @Get()
  async getHistory(
    @Query('type') type: string,
    @Query('entity') entity: string,
    @Query('createdBy') createdBy: number,
    @Query('orderBy') orderBy: string,
    @Query('orderType') orderType: string,
  ): Promise<History[]> {
    return this.historyService.getHistory(
      type,
      entity,
      createdBy,
      orderBy,
      orderType,
    );
  }

  @Get(':id') getHistoryById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<History> {
    return this.historyService.getHistoryById(id);
  }
}
