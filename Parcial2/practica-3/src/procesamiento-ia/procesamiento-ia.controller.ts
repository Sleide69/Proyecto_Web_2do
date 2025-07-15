import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProcesamientoIaService } from './procesamiento-ia.service';
import { CreateProcesamientoIaDto } from './dto/create-procesamiento-ia.dto';
import { UpdateProcesamientoIaDto } from './dto/update-procesamiento-ia.dto';

@Controller('procesamiento-ia')
export class ProcesamientoIaController {
  constructor(private readonly procesamientoIaService: ProcesamientoIaService) {}

  @Post()
  create(@Body() createProcesamientoIaDto: CreateProcesamientoIaDto) {
    return this.procesamientoIaService.create(createProcesamientoIaDto);
  }

  @Get()
  findAll() {
    return this.procesamientoIaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.procesamientoIaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProcesamientoIaDto: UpdateProcesamientoIaDto) {
    return this.procesamientoIaService.update(+id, updateProcesamientoIaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.procesamientoIaService.remove(+id);
  }
}
