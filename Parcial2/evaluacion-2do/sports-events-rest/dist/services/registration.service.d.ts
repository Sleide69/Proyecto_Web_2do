import { JsonPersistenceService } from '../persistence/json-persistence.service';
import { Registration } from '../entities/registration.entity';
import { CreateRegistrationDto, UpdateRegistrationDto, RegistrationSummaryDto } from '../dto/registration.dto';
import { RaceService } from './race.service';
import { CompetitorService } from './competitor.service';
import { PaymentService } from './payment.service';
export declare class RegistrationService {
    private readonly persistence;
    private readonly raceService;
    private readonly competitorService;
    private readonly paymentService;
    constructor(persistence: JsonPersistenceService, raceService: RaceService, competitorService: CompetitorService, paymentService: PaymentService);
    createRegistration(createRegistrationDto: CreateRegistrationDto): Promise<Registration>;
    findAllRegistrations(): Promise<Registration[]>;
    findRegistrationById(id: string): Promise<Registration>;
    updateRegistration(id: string, updateRegistrationDto: UpdateRegistrationDto): Promise<Registration>;
    cancelRegistration(id: string): Promise<Registration>;
    confirmRegistration(id: string): Promise<Registration>;
    getRegistrationSummary(id: string): Promise<RegistrationSummaryDto>;
    getRegistrationsByRace(raceId: string): Promise<Registration[]>;
    getRegistrationsByCompetitor(competitorId: string): Promise<Registration[]>;
    private loadRelatedData;
}
