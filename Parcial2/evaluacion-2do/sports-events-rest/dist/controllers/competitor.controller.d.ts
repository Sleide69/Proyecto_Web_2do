import { CompetitorService } from '../services/competitor.service';
import { CreateCompetitorDto, UpdateCompetitorDto } from '../dto/competitor.dto';
export declare class CompetitorController {
    private readonly competitorService;
    constructor(competitorService: CompetitorService);
    create(createCompetitorDto: CreateCompetitorDto): Promise<import("../entities").Competitor>;
    findAll(search?: string): Promise<import("../entities").Competitor[]>;
    findOne(id: string): Promise<import("../entities").Competitor>;
    getRegistrations(id: string): Promise<{
        competitorId: string;
    }[]>;
    update(id: string, updateCompetitorDto: UpdateCompetitorDto): Promise<import("../entities").Competitor>;
    remove(id: string): Promise<void>;
}
