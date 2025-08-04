import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { CompetitorService } from '../services/competitor.service';
import { CreateCompetitorDto, UpdateCompetitorDto } from '@sports-events/domain';

@Controller('competitors')
export class CompetitorController {
  constructor(private readonly competitorService: CompetitorService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createCompetitorDto: CreateCompetitorDto) {
    return await this.competitorService.createCompetitor(createCompetitorDto);
  }

  @Get()
  async findAll(@Query('search') search?: string) {
    if (search) {
      return await this.competitorService.searchCompetitors(search);
    }
    return await this.competitorService.findAllCompetitors();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.competitorService.findCompetitorById(id);
  }

  @Get(':id/registrations')
  async getRegistrations(@Param('id') id: string) {
    return await this.competitorService.getCompetitorRegistrations(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCompetitorDto: UpdateCompetitorDto) {
    return await this.competitorService.updateCompetitor(id, updateCompetitorDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.competitorService.deleteCompetitor(id);
  }
}
