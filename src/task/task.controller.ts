import { AuthGuard } from './../auth/auth.guard';
import { TaskService } from './task.service';
import { TaskDto, FindAllParameters, TaskRouteParameters } from './task.dto';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {

    constructor(private readonly taskService: TaskService) {  }

    @Post('cadastrar')
    async create(@Body() task: TaskDto){
        return await this.taskService.create( task );
    }

    @Get('/:id')
    async findById(@Param('id') id:string): Promise<TaskDto> {
        return await this.taskService.findById(id);
    }

    @Get('')
    async findAll(@Query() params: FindAllParameters): Promise<TaskDto[]> {
        return this.taskService.findAll(params);
    }

    @Put('/:id')
    async update(@Param() params: TaskRouteParameters, @Body() task: TaskDto) {
        await this.taskService.update( params.id, task);
    }

    @Delete('/:id')
    delete(@Param('id') id: string) {
        return this.taskService.delete(id);
    }
        
}
