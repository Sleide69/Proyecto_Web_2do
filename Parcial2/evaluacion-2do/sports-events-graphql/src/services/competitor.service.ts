import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { JsonPersistenceService } from '../persistence/json-persistence.service';
import { Competitor } from '../entities/competitor.entity';
import { CreateCompetitorInput, UpdateCompetitorInput } from '../inputs/competitor.input';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CompetitorService {
  constructor(private readonly persistence: JsonPersistenceService) {}

  async createCompetitor(createCompetitorInput: CreateCompetitorInput): Promise<Competitor> {
    // Verificar si ya existe un competidor con el mismo email
    const existingCompetitor = this.persistence.findOneBy<Competitor>('competitors', { 
      email: createCompetitorInput.email 
    });

    if (existingCompetitor) {
      throw new ConflictException(`Ya existe un competidor con el email ${createCompetitorInput.email}`);
    }

    const competitor = new Competitor({
      id: uuidv4(),
      ...createCompetitorInput,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return this.persistence.create('competitors', competitor);
  }

  async findAllCompetitors(): Promise<Competitor[]> {
    return this.persistence.findAll<Competitor>('competitors');
  }

  async findCompetitorById(id: string): Promise<Competitor> {
    const competitor = this.persistence.findById<Competitor>('competitors', id);
    if (!competitor) {
      throw new NotFoundException(`Competidor con ID ${id} no encontrado`);
    }
    return competitor;
  }

  async findCompetitorByEmail(email: string): Promise<Competitor | null> {
    const competitor = this.persistence.findOneBy<Competitor>('competitors', { email });
    return competitor || null;
  }

  async updateCompetitor(id: string, updateCompetitorInput: UpdateCompetitorInput): Promise<Competitor> {
    const existingCompetitor = await this.findCompetitorById(id);

    // Si se está actualizando el email, verificar que no esté en uso por otro competidor
    if (updateCompetitorInput.email && updateCompetitorInput.email !== existingCompetitor.email) {
      const emailInUse = this.persistence.findOneBy<Competitor>('competitors', { 
        email: updateCompetitorInput.email 
      });
      
      if (emailInUse && emailInUse.id !== id) {
        throw new ConflictException(`El email ${updateCompetitorInput.email} ya está en uso por otro competidor`);
      }
    }

    const updatedCompetitor = this.persistence.update<Competitor>('competitors', id, updateCompetitorInput);
    if (!updatedCompetitor) {
      throw new NotFoundException(`Competidor con ID ${id} no encontrado`);
    }

    return updatedCompetitor;
  }

  async deleteCompetitor(id: string): Promise<boolean> {
    // Verificar si hay registros asociados
    const registrations = this.persistence.findBy('registrations', { competitorId: id });
    if (registrations.length > 0) {
      throw new ConflictException('No se puede eliminar un competidor que tiene registros asociados');
    }

    const deleted = this.persistence.delete('competitors', id);
    if (!deleted) {
      throw new NotFoundException(`Competidor con ID ${id} no encontrado`);
    }
    
    return deleted;
  }
}
