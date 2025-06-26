import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CapturaService } from './captura.service';
import { CreateCapturaDto } from './dto/create-captura.dto';
import { UpdateCapturaDto } from './dto/update-captura.dto';

@Controller('captura')
export class CapturaController {
  constructor(private readonly capturaService: CapturaService) {}

  @Post()
  create(@Body() dto: CreateCapturaDto) {
    return this.capturaService.create(dto);
  }

  @Get()
  findAll() {
    return this.capturaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.capturaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCapturaDto) {
    return this.capturaService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.capturaService.remove(+id);
  }
}
