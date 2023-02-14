import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/PrismaService';
import { Injectable } from '@nestjs/common';
import { History } from '@prisma/client';
import { HistoryTypeEnum } from 'utils/enums';
@Injectable()
export class HistoryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async getHistory(
    type: string,
    className: string,
    createdBy: number,
    orderBy: string,
  ): Promise<History[]> {
    return await this.prisma.history.findMany({
      where: {
        type,
        OR: {
          createdBy,
          OR: {
            description: {
              contains: className,
            },
          },
        },
      },
      orderBy: {
        [orderBy]: 'asc',
      },
    });
  }

  async getHistoryById(id: number): Promise<History> {
    return await this.prisma.history.findFirst({ where: { id } });
  }

  async addHistory(
    operationType: HistoryTypeEnum,
    className: string,
    object: any,
    bearerToken: string,
    args?: any[],
  ): Promise<History> {
    const type: string = operationType.toString();
    let createdBy = 1;
    let description = `${type} of ${className}`;
    if (bearerToken !== 'system' && bearerToken) {
      createdBy = this.jwtService.decode(
        bearerToken.replace('Bearer ', '').trim(),
      )['sub'];
    }
    if (args) {
      description += ' : ';
      for (const arg of args) {
        description += `${arg} `;
      }
    }
    return await this.prisma.history.create({
      data: {
        description,
        type,
        object: object ? JSON.stringify(object) : 'NULL',
        createdBy,
      },
    });
  }
}
