import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.category.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        quotes: {
          select: {
            id: true,
            text: true,
          },
        },
      },
    });
  }
}
