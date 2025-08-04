import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { CompetitorService } from '../services/competitor.service';
import { Competitor } from '../entities/competitor.entity';
import { CreateCompetitorInput, UpdateCompetitorInput } from '../inputs/competitor.input';

@Resolver(() => Competitor)
export class CompetitorResolver {
  constructor(private readonly competitorService: CompetitorService) {}

  @Mutation(() => Competitor, { description: 'Crear un nuevo competidor' })
  async createCompetitor(@Args('input') input: CreateCompetitorInput): Promise<Competitor> {
    return await this.competitorService.createCompetitor(input);
  }

  @Query(() => [Competitor], { description: 'Obtener todos los competidores' })
  async competitors(): Promise<Competitor[]> {
    return await this.competitorService.findAllCompetitors();
  }

  @Query(() => Competitor, { description: 'Obtener competidor por ID' })
  async competitor(@Args('id', { type: () => ID }) id: string): Promise<Competitor> {
    return await this.competitorService.findCompetitorById(id);
  }

  @Mutation(() => Competitor, { description: 'Actualizar un competidor' })
  async updateCompetitor(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateCompetitorInput
  ): Promise<Competitor> {
    return await this.competitorService.updateCompetitor(id, input);
  }

  @Mutation(() => Boolean, { description: 'Eliminar un competidor' })
  async deleteCompetitor(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    return await this.competitorService.deleteCompetitor(id);
  }
}
