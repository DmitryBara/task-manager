import { Module } from '@nestjs/common';
import { PhaseModule } from 'src/phase/phase.module';
import { TaskRepository } from './task.repository';
import { TaskResolver } from './task.resolver';
import { TaskService } from './task.service';

@Module({
  imports: [PhaseModule],
  providers: [TaskResolver, TaskService, TaskRepository],
})
export class TaskModule { }
