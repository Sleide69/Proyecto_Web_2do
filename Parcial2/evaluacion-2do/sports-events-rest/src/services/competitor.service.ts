import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { JsonPersistenceService } from '../persistence/json-persistence.service';
import { Competitor, CreateCompetitorDto, UpdateCompetitorDto } from '@sports-events/domain';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CompetitorService {
  constructor(private readonly persistence: JsonPersistenceService) {}

  async createCompetitor(createCompetitorDto: CreateCompetitorDto): Promise<Competitor> {
    // Verificar si ya existe un competidor con el mismo email
    const existingCompetitor = this.persistence.findOneBy<Competitor>('competitors', { 
      email: createCompetitorDto.email 
    });

    if (existingCompetitor) {
      throw new ConflictException(`Ya existe un competidor con el email ${createCompetitorDto.email}`);
    }

    const competitor = new Competitor({
      id: uuidv4(),
      ...createCompetitorDto,
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

  async updateCompetitor(id: string, updateCompetitorDto: UpdateCompetitorDto): Promise<Competitor> {
    const existingCompetitor = await this.findCompetitorById(id);

    // Si se está actualizando el email, verificar que no esté en uso por otro competidor
    if (updateCompetitorDto.email && updateCompetitorDto.email !== existingCompetitor.email) {
      const emailInUse = this.persistence.findOneBy<Competitor>('competitors', { 
        email: updateCompetitorDto.email 
      });
      
      if (emailInUse && emailInUse.id !== id) {
        throw new ConflictException(`El email ${updateCompetitorDto.email} ya está en uso por otro competidor`);
      }
    }

    const updatedCompetitor = this.persistence.update<Competitor>('competitors', id, updateCompetitorDto);
    if (!updatedCompetitor) {
      throw new NotFoundException(`Competidor con ID ${id} no encontrado`);
    }

    return updatedCompetitor;
  }

  async deleteCompetitor(id: string): Promise<void> {
    // Verificar si hay registros asociados
    const registrations = this.persistence.findBy('registrations', { competitorId: id });
    if (registrations.length > 0) {
      throw new ConflictException('No se puede eliminar un competidor que tiene registros asociados');
    }

    const deleted = this.persistence.delete('competitors', id);
    if (!deleted) {
      throw new NotFoundException(`Competidor con ID ${id} no encontrado`);
    }
  }

  async searchCompetitors(searchTerm: string): Promise<Competitor[]> {
    const allCompetitors = this.persistence.findAll<Competitor>('competitors');
    const term = searchTerm.toLowerCase();

    return allCompetitors.filter(competitor =>
      competitor.firstName.toLowerCase().includes(term) ||
      competitor.lastName.toLowerCase().includes(term) ||
      competitor.email.toLowerCase().includes(term) ||
      competitor.phone.includes(term)
    );
  }

  async getCompetitorRegistrations(competitorId: string) {
    await this.findCompetitorById(competitorId); // Verificar que existe
    return this.persistence.findBy('registrations', { competitorId });
  }
}
