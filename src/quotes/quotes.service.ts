import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class QuotesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.quote.findMany({
      select: {
        id: true,
        text: true,
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async findRandom() {
    const count = await this.prisma.quote.count();
    const random = Math.floor(Math.random() * count) + 1;
    return this.findOne(random);
  }

  findOne(id: number) {
    return this.prisma.quote.findUnique({
      where: { id },
      select: {
        id: true,
        text: true,
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }
}
