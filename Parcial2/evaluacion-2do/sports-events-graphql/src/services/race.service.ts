import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { JsonPersistenceService } from '../persistence/json-persistence.service';
import { Race, RaceStatus, CreateRaceDto, UpdateRaceDto } from '@sports-events/domain';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RaceService {
  constructor(private readonly persistence: JsonPersistenceService) {}

  async createRace(createRaceInput: CreateRaceDto): Promise<Race> {
    // Validaciones de negocio
    if (createRaceInput.registrationStartDate >= createRaceInput.registrationEndDate) {
      throw new BadRequestException('La fecha de inicio de registro debe ser anterior a la fecha de fin');
    }

    if (createRaceInput.registrationEndDate >= createRaceInput.eventDate) {
      throw new BadRequestException('La fecha de fin de registro debe ser anterior a la fecha del evento');
    }

    const race = new Race({
      id: uuidv4(),
      name: createRaceInput.name,
      description: createRaceInput.description,
      type: createRaceInput.type,
      eventDate: new Date(createRaceInput.eventDate),
      registrationStartDate: new Date(createRaceInput.registrationStartDate),
      registrationEndDate: new Date(createRaceInput.registrationEndDate),
      maxParticipants: createRaceInput.maxParticipants,
      registrationFee: createRaceInput.registrationFee,
      location: createRaceInput.location,
      status: createRaceInput.status || RaceStatus.PLANNED,
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

  async updateRace(id: string, updateRaceInput: UpdateRaceDto): Promise<Race> {
    const existingRace = await this.findRaceById(id);

    // Validaciones de negocio para la actualización
    if (updateRaceInput.registrationStartDate && updateRaceInput.registrationEndDate) {
      if (updateRaceInput.registrationStartDate >= updateRaceInput.registrationEndDate) {
        throw new BadRequestException('La fecha de inicio de registro debe ser anterior a la fecha de fin');
      }
    }

    // Convertir fechas de string a Date si están presentes
    const updateData: Partial<Race> = {
      updatedAt: new Date()
    };

    // Copiar propiedades que no requieren conversión
    if (updateRaceInput.name) updateData.name = updateRaceInput.name;
    if (updateRaceInput.description) updateData.description = updateRaceInput.description;
    if (updateRaceInput.type) updateData.type = updateRaceInput.type;
    if (updateRaceInput.location) updateData.location = updateRaceInput.location;
    if (updateRaceInput.distance) updateData.distance = updateRaceInput.distance;
    if (updateRaceInput.maxParticipants) updateData.maxParticipants = updateRaceInput.maxParticipants;
    if (updateRaceInput.registrationFee) updateData.registrationFee = updateRaceInput.registrationFee;
    if (updateRaceInput.status) updateData.status = updateRaceInput.status;

    // Convertir fechas
    if (updateRaceInput.eventDate) {
      updateData.eventDate = new Date(updateRaceInput.eventDate);
    }
    if (updateRaceInput.registrationStartDate) {
      updateData.registrationStartDate = new Date(updateRaceInput.registrationStartDate);
    }
    if (updateRaceInput.registrationEndDate) {
      updateData.registrationEndDate = new Date(updateRaceInput.registrationEndDate);
    }

    const updatedRace = this.persistence.update<Race>('races', id, updateData);
    if (!updatedRace) {
      throw new NotFoundException(`Carrera con ID ${id} no encontrada`);
    }

    return updatedRace;
  }

  async deleteRace(id: string): Promise<boolean> {
    // Verificar si hay registros asociados
    const registrations = this.persistence.findBy('registrations', { raceId: id });
    if (registrations.length > 0) {
      throw new BadRequestException('No se puede eliminar una carrera que tiene registros asociados');
    }

    const deleted = this.persistence.delete('races', id);
    if (!deleted) {
      throw new NotFoundException(`Carrera con ID ${id} no encontrada`);
    }
    
    return deleted;
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
