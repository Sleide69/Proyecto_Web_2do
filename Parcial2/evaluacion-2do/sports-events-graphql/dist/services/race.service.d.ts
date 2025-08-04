import { JsonPersistenceService } from '../persistence/json-persistence.service';
import { Race, RaceStatus } from '../entities/race.entity';
import { CreateRaceInput, UpdateRaceInput } from '../inputs/race.input';
export declare class RaceService {
    private readonly persistence;
    constructor(persistence: JsonPersistenceService);
    createRace(createRaceInput: CreateRaceInput): Promise<Race>;
    findAllRaces(): Promise<Race[]>;
    findRaceById(id: string): Promise<Race>;
    updateRace(id: string, updateRaceInput: UpdateRaceInput): Promise<Race>;
    deleteRace(id: string): Promise<boolean>;
    updateRaceStatus(id: string, status: RaceStatus): Promise<Race>;
    getRacesByStatus(status: RaceStatus): Promise<Race[]>;
    getAvailableRaces(): Promise<Race[]>;
    getRaceStatistics(id: string): Promise<{
        raceId: string;
        raceName: string;
        totalRegistrations: number;
        availableSpots: number;
        registrationPercentage: number;
    }>;
}
