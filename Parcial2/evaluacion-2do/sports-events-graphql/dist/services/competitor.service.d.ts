import { JsonPersistenceService } from '../persistence/json-persistence.service';
import { Competitor } from '../entities/competitor.entity';
import { CreateCompetitorInput, UpdateCompetitorInput } from '../inputs/competitor.input';
export declare class CompetitorService {
    private readonly persistence;
    constructor(persistence: JsonPersistenceService);
    createCompetitor(createCompetitorInput: CreateCompetitorInput): Promise<Competitor>;
    findAllCompetitors(): Promise<Competitor[]>;
    findCompetitorById(id: string): Promise<Competitor>;
    findCompetitorByEmail(email: string): Promise<Competitor | null>;
    updateCompetitor(id: string, updateCompetitorInput: UpdateCompetitorInput): Promise<Competitor>;
    deleteCompetitor(id: string): Promise<boolean>;
}
