import { JsonPersistenceService } from '../persistence/json-persistence.service';
import { Competitor } from '../entities/competitor.entity';
import { CreateCompetitorDto, UpdateCompetitorDto } from '../dto/competitor.dto';
export declare class CompetitorService {
    private readonly persistence;
    constructor(persistence: JsonPersistenceService);
    createCompetitor(createCompetitorDto: CreateCompetitorDto): Promise<Competitor>;
    findAllCompetitors(): Promise<Competitor[]>;
    findCompetitorById(id: string): Promise<Competitor>;
    findCompetitorByEmail(email: string): Promise<Competitor | null>;
    updateCompetitor(id: string, updateCompetitorDto: UpdateCompetitorDto): Promise<Competitor>;
    deleteCompetitor(id: string): Promise<void>;
    searchCompetitors(searchTerm: string): Promise<Competitor[]>;
    getCompetitorRegistrations(competitorId: string): Promise<{
        competitorId: string;
    }[]>;
}
