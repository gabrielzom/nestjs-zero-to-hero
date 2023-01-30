import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { HistoryModule } from './history/history.module';

@Module({
  imports: [TaskModule, UserModule, ConfigModule.forRoot(), AuthModule, HistoryModule],
})
export class AppModule {}
