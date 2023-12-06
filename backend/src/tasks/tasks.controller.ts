import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.entity';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Tasks')
@Controller('tasks')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Post()
  @ApiOperation({
    summary: 'Create a new task',
    description: 'Create a new task',
  })
  @ApiBody({ type: CreateTaskDto })
  async createTask(@Body() dto: CreateTaskDto): Promise<Task> {
    return await this.tasksService.createTask(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get task by id', description: 'Get task by id' })
  async getTaskById(@Param('id') id: number): Promise<Task> {
    return await this.tasksService.getTaskById(id);
  }

  @Get('getAllTasksByUser/:id')
  @ApiOperation({ summary: 'Get task by id', description: 'Get task by id' })
  async getAllTasksByUser(@Param('id') id: number): Promise<Task[]> {
    return await this.tasksService.getAllTasksByUser(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update task by id',
    description: 'Update task by id',
  })
  async updateTask(
    @Param('id') id: number,
    @Body() dto: UpdateTaskDto,
  ): Promise<Task> {
    return await this.tasksService.updateTask(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete task by id',
    description: 'Delete task by id',
  })
  async deleteTask(@Param('id') id: number): Promise<any> {
    return await this.tasksService.deleteTask(id);
  }
}
