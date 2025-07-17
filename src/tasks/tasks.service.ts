import { Injectable, NotFoundException } from '@nestjs/common';
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

  findAll(userId: number) {
    const tasks = this.prisma.findAllTasks(userId);
    return tasks;
  }

  async findOne(id: number) {
    const task = await this.prisma.findTask(id);
    return task;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  async remove(id: number) {
    const task = await this.prisma.findTask(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    const deletedTask = await this.prisma.deleteTask(id);
    return deletedTask;
  }
}
