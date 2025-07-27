import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto, userId: number) {
    const newTask = await this.prisma.createTask(createTaskDto, userId);
    return newTask;
  }

  async findAll(userId: number) {
    const tasks = await this.prisma.findAllTasks(userId);
    return tasks;
  }

  async findOne(id: number, userId: number) {
    const task = await this.prisma.findTask(id, userId);
    if (!task) {
      const taskExists = await this.prisma.findTask(id);
      if (!taskExists) {
        throw new NotFoundException('Task not found');
      } else {
        throw new ForbiddenException('You can only access your own tasks');
      }
    }

    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto, userId: number) {
    const existingTask = await this.prisma.findTask(id);
    if (!existingTask) {
      throw new NotFoundException('Task not found');
    }

    if (existingTask.userId !== userId) {
      throw new ForbiddenException('You can only update your own tasks');
    }

    const updatedTask = await this.prisma.updateTask(id, updateTaskDto, userId);
    return updatedTask;
  }

  async remove(id: number, userId: number) {
    const task = await this.prisma.findTask(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.userId !== userId) {
      throw new ForbiddenException('You can only delete your own tasks');
    }

    const deletedTask = await this.prisma.deleteTask(id, userId);
    return deletedTask;
  }
}
