import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthorsService } from './authors.service';

@Controller('authors')
@ApiTags('Authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @ApiOperation({ summary: 'Returns a list of authors' })
  @Get()
  findAll() {
    return this.authorsService.findAll();
  }

  @ApiOperation({ summary: 'Returns an author for a particular id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorsService.findOne(+id);
  }
}
