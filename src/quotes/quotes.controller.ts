import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { QuotesService } from './quotes.service';

@Controller('quotes')
@ApiTags('Quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @ApiOperation({ summary: 'Returns a list of quotes' })
  @Get()
  findAll() {
    return this.quotesService.findAll();
  }

  @ApiOperation({ summary: 'Returns a random quote' })
  @Get('random')
  findRandom() {
    return this.quotesService.findRandom();
  }

  @ApiOperation({ summary: 'Returns a quote for a particular id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quotesService.findOne(+id);
  }
}
