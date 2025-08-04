import { JsonPersistenceService } from '../persistence/json-persistence.service';
import { Registration } from '../entities/registration.entity';
import { CreateRegistrationInput, UpdateRegistrationInput } from '../inputs/registration.input';
import { RaceService } from './race.service';
import { CompetitorService } from './competitor.service';
export declare class RegistrationService {
    private readonly persistence;
    private readonly raceService;
    private readonly competitorService;
    constructor(persistence: JsonPersistenceService, raceService: RaceService, competitorService: CompetitorService);
    createRegistration(createRegistrationInput: CreateRegistrationInput): Promise<Registration>;
    findAllRegistrations(): Promise<Registration[]>;
    findRegistrationById(id: string): Promise<Registration>;
    updateRegistration(id: string, updateRegistrationInput: UpdateRegistrationInput): Promise<Registration>;
    cancelRegistration(id: string): Promise<Registration>;
    confirmRegistration(id: string): Promise<Registration>;
    getRegistrationsByRace(raceId: string): Promise<Registration[]>;
    private loadRelatedData;
}
