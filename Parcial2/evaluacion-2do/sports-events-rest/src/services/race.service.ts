import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { JsonPersistenceService } from '../persistence/json-persistence.service';
import { Race, RaceStatus, CreateRaceDto, UpdateRaceDto } from '@sports-events/domain';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RaceService {
  constructor(private readonly persistence: JsonPersistenceService) {}

  async createRace(createRaceDto: CreateRaceDto): Promise<Race> {
    // Validaciones de negocio
    if (createRaceDto.registrationStartDate >= createRaceDto.registrationEndDate) {
      throw new BadRequestException('La fecha de inicio de registro debe ser anterior a la fecha de fin');
    }

    if (createRaceDto.registrationEndDate >= createRaceDto.eventDate) {
      throw new BadRequestException('La fecha de fin de registro debe ser anterior a la fecha del evento');
    }

    const race = new Race({
      id: uuidv4(),
      name: createRaceDto.name,
      description: createRaceDto.description,
      type: createRaceDto.type,
      eventDate: new Date(createRaceDto.eventDate),
      registrationStartDate: new Date(createRaceDto.registrationStartDate),
      registrationEndDate: new Date(createRaceDto.registrationEndDate),
      maxParticipants: createRaceDto.maxParticipants,
      registrationFee: createRaceDto.registrationFee,
      location: createRaceDto.location,
      status: createRaceDto.status || RaceStatus.PLANNED,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return this.persistence.create('races', race);
  }

  async findAllRaces(): Promise<Race[]> {
    return this.persistence.findAll<Race>('races');
  }

  async findRaceById(id: string): Promise<Race> {
    const race = this.persistence.findById<Race>('races', id);
    if (!race) {
      throw new NotFoundException(`Carrera con ID ${id} no encontrada`);
    }
    return race;
  }

  async updateRace(id: string, updateRaceDto: UpdateRaceDto): Promise<Race> {
    const existingRace = await this.findRaceById(id);

    // Validaciones de negocio para la actualización
    if (updateRaceDto.registrationStartDate && updateRaceDto.registrationEndDate) {
      if (updateRaceDto.registrationStartDate >= updateRaceDto.registrationEndDate) {
        throw new BadRequestException('La fecha de inicio de registro debe ser anterior a la fecha de fin');
      }
    }

    // Convertir fechas de string a Date si están presentes
    const updateData: Partial<Race> = {
      updatedAt: new Date()
    };

    // Copiar propiedades que no requieren conversión
    if (updateRaceDto.name) updateData.name = updateRaceDto.name;
    if (updateRaceDto.description) updateData.description = updateRaceDto.description;
    if (updateRaceDto.type) updateData.type = updateRaceDto.type;
    if (updateRaceDto.location) updateData.location = updateRaceDto.location;
    if (updateRaceDto.distance) updateData.distance = updateRaceDto.distance;
    if (updateRaceDto.maxParticipants) updateData.maxParticipants = updateRaceDto.maxParticipants;
    if (updateRaceDto.registrationFee) updateData.registrationFee = updateRaceDto.registrationFee;
    if (updateRaceDto.status) updateData.status = updateRaceDto.status;

    // Convertir fechas
    if (updateRaceDto.eventDate) {
      updateData.eventDate = new Date(updateRaceDto.eventDate);
    }
    if (updateRaceDto.registrationStartDate) {
      updateData.registrationStartDate = new Date(updateRaceDto.registrationStartDate);
    }
    if (updateRaceDto.registrationEndDate) {
      updateData.registrationEndDate = new Date(updateRaceDto.registrationEndDate);
    }

    const updatedRace = this.persistence.update<Race>('races', id, updateData);
    if (!updatedRace) {
      throw new NotFoundException(`Carrera con ID ${id} no encontrada`);
    }

    return updatedRace;
  }

  async deleteRace(id: string): Promise<void> {
    // Verificar si hay registros asociados
    const registrations = this.persistence.findBy('registrations', { raceId: id });
    if (registrations.length > 0) {
      throw new BadRequestException('No se puede eliminar una carrera que tiene registros asociados');
    }

    const deleted = this.persistence.delete('races', id);
    if (!deleted) {
      throw new NotFoundException(`Carrera con ID ${id} no encontrada`);
    }
  }

  async updateRaceStatus(id: string, status: RaceStatus): Promise<Race> {
    return this.updateRace(id, { status });
  }

  async getRacesByStatus(status: RaceStatus): Promise<Race[]> {
    return this.persistence.findBy<Race>('races', { status });
  }

  async getAvailableRaces(): Promise<Race[]> {
    const now = new Date();
    const allRaces = this.persistence.findAll<Race>('races');
    
    return allRaces.filter(race => {
      const registrationStart = new Date(race.registrationStartDate);
      const registrationEnd = new Date(race.registrationEndDate);
      
      return race.status === RaceStatus.OPEN_REGISTRATION &&
             now >= registrationStart &&
             now <= registrationEnd;
    });
  }

  async getRaceStatistics(id: string) {
    const race = await this.findRaceById(id);
    const registrations = this.persistence.findBy('registrations', { raceId: id });
    
    return {
      raceId: id,
      raceName: race.name,
      totalRegistrations: registrations.length,
      availableSpots: race.maxParticipants - registrations.length,
      registrationPercentage: (registrations.length / race.maxParticipants) * 100
    };
  }
}
