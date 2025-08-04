import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { RaceService } from '../services/race.service';
import { Race, RaceStatus, CreateRaceDto, UpdateRaceDto } from '@sports-events/domain';

@Resolver(() => Race)
export class RaceResolver {
  constructor(private readonly raceService: RaceService) {}

  @Mutation(() => Race, { description: 'Crear una nueva carrera' })
  async createRace(@Args('input') input: CreateRaceDto): Promise<Race> {
    return await this.raceService.createRace(input);
  }

  @Query(() => [Race], { description: 'Obtener todas las carreras' })
  async races(): Promise<Race[]> {
    return await this.raceService.findAllRaces();
  }

  @Query(() => [Race], { description: 'Obtener carreras disponibles para registro' })
  async availableRaces(): Promise<Race[]> {
    return await this.raceService.getAvailableRaces();
  }

  @Query(() => [Race], { description: 'Obtener carreras por estado' })
  async racesByStatus(@Args('status', { type: () => RaceStatus }) status: RaceStatus): Promise<Race[]> {
    return await this.raceService.getRacesByStatus(status);
  }

  @Query(() => Race, { description: 'Obtener carrera por ID' })
  async race(@Args('id', { type: () => ID }) id: string): Promise<Race> {
    return await this.raceService.findRaceById(id);
  }

  @Mutation(() => Race, { description: 'Actualizar una carrera' })
  async updateRace(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateRaceDto
  ): Promise<Race> {
    return await this.raceService.updateRace(id, input);
  }

  @Mutation(() => Race, { description: 'Actualizar el estado de una carrera' })
  async updateRaceStatus(
    @Args('id', { type: () => ID }) id: string,
    @Args('status', { type: () => RaceStatus }) status: RaceStatus
  ): Promise<Race> {
    return await this.raceService.updateRaceStatus(id, status);
  }

  @Mutation(() => Boolean, { description: 'Eliminar una carrera' })
  async deleteRace(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    return await this.raceService.deleteRace(id);
  }
}
