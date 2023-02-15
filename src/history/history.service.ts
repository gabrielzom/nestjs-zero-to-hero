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
    contains: string,
    user: number,
    field: string,
    orderType: string,
  ): Promise<History[]> {
    let query = 'SELECT * FROM `tab_historys`\n';
    let clause = 'WHERE';
    if (user) {
      query += `${clause} created_by = ${user}\n`;
    } else {
      if (type) {
        query += `${clause} type = '${type}'\n`;
        clause = 'AND';
      }
      if (contains) {
        query += `${clause} description LIKE '%${contains}%'\n`;
        clause = 'AND';
      }
    }
    if (field) {
      query += `ORDER BY ${field.toString()} `;
      if (orderType) {
        query += orderType;
      } else {
        query += 'ASC';
      }
    } else {
      query += `ORDER BY id ASC`;
    }
    return await this.prisma.$queryRawUnsafe(query);
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
      )['id'];
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
