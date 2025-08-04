import { CompetitorService } from '../services/competitor.service';
import { Competitor } from '../entities/competitor.entity';
import { CreateCompetitorInput, UpdateCompetitorInput } from '../inputs/competitor.input';
export declare class CompetitorResolver {
    private readonly competitorService;
    constructor(competitorService: CompetitorService);
    createCompetitor(input: CreateCompetitorInput): Promise<Competitor>;
    competitors(): Promise<Competitor[]>;
    competitor(id: string): Promise<Competitor>;
    updateCompetitor(id: string, input: UpdateCompetitorInput): Promise<Competitor>;
    deleteCompetitor(id: string): Promise<boolean>;
}
