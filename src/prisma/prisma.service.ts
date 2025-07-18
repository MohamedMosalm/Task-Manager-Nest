import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { UpdateTaskDto } from 'src/tasks/dto/update-task.dto';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  onModuleInit() {
    this.$connect()
      .then(() => console.log('Connected to Database'))
      .catch((error) => console.log(error));
  }

  async createTask(createTaskDto: CreateTaskDto, userId: number) {
    const newTask = await this.task.create({
      data: {
        title: createTaskDto.title,
        content: createTaskDto.content,
        userId,
      },
    });

    return newTask;
  }

  async findTask(id: number) {
    const task = await this.task.findUnique({
      where: {
        id,
      },
    });

    return task;
  }

  async findAllTasks(userId: number) {
    const tasks = await this.task.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return tasks;
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto) {
    const updateData: Prisma.TaskUpdateInput = {};
    if (updateTaskDto.title !== undefined) {
      updateData.title = updateTaskDto.title;
    }
    if (updateTaskDto.content !== undefined) {
      updateData.content = updateTaskDto.content;
    }
    if (updateTaskDto.completed !== undefined) {
      updateData.completed = updateTaskDto.completed;
    }

    const updatedTask = await this.task.update({
      where: {
        id,
      },
      data: updateData,
    });

    return updatedTask;
  }

  async deleteTask(id: number) {
    const deletedTask = await this.task.delete({
      where: {
        id,
      },
    });

    return deletedTask;
  }

  async findUserByEmail(email: string) {
    const user = await this.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }
}
