import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';

@Injectable()
export class QuotesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createQuoteDto: CreateQuoteDto) {
    const {
      text,
      author: { name: author },
      category: { name: category },
    } = createQuoteDto;
    return this.prisma.quote.create({
      data: {
        text,
        author: {
          connectOrCreate: {
            where: { name: author },
            create: { name: author },
          },
        },
        category: {
          connectOrCreate: {
            where: { name: category },
            create: { name: category },
          },
        },
      },
    });
  }

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

  update(id: number, updateQuoteDto: UpdateQuoteDto) {
    const {
      text,
      author: { name: author },
      category: { name: category },
    } = updateQuoteDto;
    return this.prisma.quote.update({
      where: { id },
      data: {
        text,
        author: {
          connectOrCreate: {
            where: { name: author },
            create: { name: author },
          },
        },
        category: {
          connectOrCreate: {
            where: { name: category },
            create: { name: category },
          },
        },
      },
    });
  }

  remove(id: number) {
    return this.prisma.quote.delete({
      where: { id },
    });
  }
}
