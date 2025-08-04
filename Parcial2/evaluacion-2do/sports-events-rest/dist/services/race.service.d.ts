import { JsonPersistenceService } from '../persistence/json-persistence.service';
import { Race, RaceStatus } from '../entities/race.entity';
import { CreateRaceDto, UpdateRaceDto } from '../dto/race.dto';
export declare class RaceService {
    private readonly persistence;
    constructor(persistence: JsonPersistenceService);
    createRace(createRaceDto: CreateRaceDto): Promise<Race>;
    findAllRaces(): Promise<Race[]>;
    findRaceById(id: string): Promise<Race>;
    updateRace(id: string, updateRaceDto: UpdateRaceDto): Promise<Race>;
    deleteRace(id: string): Promise<void>;
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
