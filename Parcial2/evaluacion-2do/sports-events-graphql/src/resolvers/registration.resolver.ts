import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { RegistrationService } from '../services/registration.service';
import { Registration, RegistrationStatus } from '../entities/registration.entity';
import { CreateRegistrationInput, UpdateRegistrationInput } from '../inputs/registration.input';

@Resolver(() => Registration)
export class RegistrationResolver {
  constructor(private readonly registrationService: RegistrationService) {}

  @Mutation(() => Registration, { description: 'Crear una nueva inscripción' })
  async createRegistration(@Args('input') input: CreateRegistrationInput): Promise<Registration> {
    return await this.registrationService.createRegistration(input);
  }

  @Query(() => [Registration], { description: 'Obtener todas las inscripciones' })
  async registrations(): Promise<Registration[]> {
    return await this.registrationService.findAllRegistrations();
  }

  @Query(() => Registration, { description: 'Obtener inscripción por ID' })
  async registration(@Args('id', { type: () => ID }) id: string): Promise<Registration> {
    return await this.registrationService.findRegistrationById(id);
  }

  @Query(() => [Registration], { description: 'Obtener inscripciones por carrera' })
  async registrationsByRace(@Args('raceId', { type: () => ID }) raceId: string): Promise<Registration[]> {
    return await this.registrationService.getRegistrationsByRace(raceId);
  }

  @Mutation(() => Registration, { description: 'Actualizar una inscripción' })
  async updateRegistration(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateRegistrationInput
  ): Promise<Registration> {
    return await this.registrationService.updateRegistration(id, input);
  }

  @Mutation(() => Registration, { description: 'Confirmar una inscripción' })
  async confirmRegistration(@Args('id', { type: () => ID }) id: string): Promise<Registration> {
    return await this.registrationService.confirmRegistration(id);
  }

  @Mutation(() => Registration, { description: 'Cancelar una inscripción' })
  async cancelRegistration(@Args('id', { type: () => ID }) id: string): Promise<Registration> {
    return await this.registrationService.cancelRegistration(id);
  }
}
