import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';

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
}
