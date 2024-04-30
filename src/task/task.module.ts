import { TaskEntity } from './../db/entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from './task.controller';
import { Module } from '@nestjs/common';
import { TaskService } from './task.service';

@Module({
    imports: [TypeOrmModule.forFeature([TaskEntity])],
    controllers: [TaskController],
    providers: [TaskService]
})
export class TaskModule {}
