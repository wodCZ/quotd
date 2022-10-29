import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthorsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.author.findMany({
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

  findOne(id: number) {
    return this.prisma.author.findUnique({
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
