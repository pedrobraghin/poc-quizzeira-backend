import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDTO, UpdateUserDTO } from '../dtos';

@Injectable()
export class UsersRepository {
  constructor(private prismaService: PrismaService) {}

  async findById(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async update(id: string, userDto: UpdateUserDTO) {
    const user = await this.prismaService.user.update({
      where: {
        id,
      },
      data: userDto,
    });

    return user;
  }

  async create(userDto: CreateUserDTO) {
    const user = await this.prismaService.user.create({
      data: userDto,
    });

    return user;
  }
}
