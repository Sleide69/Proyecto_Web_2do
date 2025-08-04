import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { RaceService } from '../services/race.service';
import { CreateRaceDto, UpdateRaceDto, RaceStatus } from '@sports-events/domain';

@ApiTags('races')
@Controller('races')
export class RaceController {
  constructor(private readonly raceService: RaceService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ 
    summary: 'Crear nueva carrera',
    description: '🏃 Interface 1: Crear Nueva Carrera - Permite al administrador definir un nuevo evento deportivo'
  })
  @ApiBody({ type: CreateRaceDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Carrera creada exitosamente'
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Datos inválidos' 
  })
  async create(@Body() createRaceDto: CreateRaceDto) {
    return await this.raceService.createRace(createRaceDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Listar todas las carreras',
    description: 'Obtiene una lista de todas las carreras registradas'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de carreras obtenida exitosamente'
  })
  async findAll() {
    return await this.raceService.findAllRaces();
  }

  @Get('available')
  @ApiOperation({ 
    summary: 'Carreras disponibles para registro',
    description: 'Obtiene las carreras que están disponibles para registro de competidores'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de carreras disponibles'
  })
  async findAvailable() {
    return await this.raceService.getAvailableRaces();
  }

  @Get('status/:status')
  async findByStatus(@Param('status') status: RaceStatus) {
    return await this.raceService.getRacesByStatus(status);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.raceService.findRaceById(id);
  }

  @Get(':id/statistics')
  async getStatistics(@Param('id') id: string) {
    return await this.raceService.getRaceStatistics(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRaceDto: UpdateRaceDto) {
    return await this.raceService.updateRace(id, updateRaceDto);
  }

  @Patch(':id/status/:status')
  async updateStatus(@Param('id') id: string, @Param('status') status: RaceStatus) {
    return await this.raceService.updateRaceStatus(id, status);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.raceService.deleteRace(id);
  }
}
