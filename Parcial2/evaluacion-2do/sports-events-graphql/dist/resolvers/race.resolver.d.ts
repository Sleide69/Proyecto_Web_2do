import { RaceService } from '../services/race.service';
import { Race, RaceStatus } from '../entities/race.entity';
import { CreateRaceInput, UpdateRaceInput } from '../inputs/race.input';
export declare class RaceResolver {
    private readonly raceService;
    constructor(raceService: RaceService);
    createRace(input: CreateRaceInput): Promise<Race>;
    races(): Promise<Race[]>;
    availableRaces(): Promise<Race[]>;
    racesByStatus(status: RaceStatus): Promise<Race[]>;
    race(id: string): Promise<Race>;
    updateRace(id: string, input: UpdateRaceInput): Promise<Race>;
    updateRaceStatus(id: string, status: RaceStatus): Promise<Race>;
    deleteRace(id: string): Promise<boolean>;
}
