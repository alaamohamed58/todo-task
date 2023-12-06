import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { Task } from './tasks.entity';

@Injectable()
export class TasksService {
  constructor(private taskRepository: TaskRepository) {}

  async createTask(dto: CreateTaskDto): Promise<any> {
    const createdTask = await this.taskRepository.save(dto);
    return {
      status: 201,
      message: 'Task created successfully',
      data: createdTask,
    };
  }

  async getAllTasksByUser(userId: number): Promise<Task[]> {
    return await this.taskRepository.find({
      where: { user_id: userId },
      relations: ['category'],
    });
  }

  async getAllTasksByUserIdAndCategory(
    userId: number,
    category_id: number,
  ): Promise<Task[]> {
    return await this.taskRepository.find({
      where: { user_id: userId, category_id: category_id },

      relations: ['category'],
    });
  }

  async getTaskById(id: number): Promise<Task> {
    return await this.taskRepository.findOne({ where: { task_id: id } });
  }

  async updateTask(id: number, dto: UpdateTaskDto): Promise<any> {
    await this.taskRepository.update(id, dto);
    const updatedTask = await this.getTaskById(id);
    return {
      status: 200,
      message: 'Task updated successfully',
      data: updatedTask,
    };
  }

  async deleteTask(id: number): Promise<any> {
    await this.taskRepository.delete(id);
    return {
      status: 204,
      message: 'Task deleted successfully',
    };
  }
}
