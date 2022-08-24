import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { TestsModule } from './tests/tests.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [TasksModule, UsersModule, ProjectsModule, TestsModule],
})
export class AppModule {}
