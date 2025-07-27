import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findUserByEmail(email: string) {
    return await this.prisma.findUserByEmail(email);
  }

  async createUser(registerDto: RegisterDto) {
    const user = await this.prisma.createUser(registerDto);
    return user;
  }
}
