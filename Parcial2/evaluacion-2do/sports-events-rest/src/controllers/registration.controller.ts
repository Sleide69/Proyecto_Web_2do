import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { RegistrationService } from '../services/registration.service';
import { CreateRegistrationDto, UpdateRegistrationDto } from '@sports-events/domain';

@Controller('registrations')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createRegistrationDto: CreateRegistrationDto) {
    return await this.registrationService.createRegistration(createRegistrationDto);
  }

  @Get()
  async findAll() {
    return await this.registrationService.findAllRegistrations();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.registrationService.findRegistrationById(id);
  }

  @Get(':id/summary')
  async getSummary(@Param('id') id: string) {
    return await this.registrationService.getRegistrationSummary(id);
  }

  @Get('race/:raceId')
  async findByRace(@Param('raceId') raceId: string) {
    return await this.registrationService.getRegistrationsByRace(raceId);
  }

  @Get('competitor/:competitorId')
  async findByCompetitor(@Param('competitorId') competitorId: string) {
    return await this.registrationService.getRegistrationsByCompetitor(competitorId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRegistrationDto: UpdateRegistrationDto) {
    return await this.registrationService.updateRegistration(id, updateRegistrationDto);
  }

  @Patch(':id/confirm')
  async confirm(@Param('id') id: string) {
    return await this.registrationService.confirmRegistration(id);
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    return await this.registrationService.cancelRegistration(id);
  }
}
