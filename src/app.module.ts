import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TaskModule, UserModule, ConfigModule.forRoot()],
})
export class AppModule {}
