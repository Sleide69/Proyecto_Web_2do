import { RaceService } from '../services/race.service';
import { CreateRaceDto, UpdateRaceDto } from '../dto/race.dto';
import { RaceStatus } from '../entities/race.entity';
export declare class RaceController {
    private readonly raceService;
    constructor(raceService: RaceService);
    create(createRaceDto: CreateRaceDto): Promise<import("../entities/race.entity").Race>;
    findAll(): Promise<import("../entities/race.entity").Race[]>;
    findAvailable(): Promise<import("../entities/race.entity").Race[]>;
    findByStatus(status: RaceStatus): Promise<import("../entities/race.entity").Race[]>;
    findOne(id: string): Promise<import("../entities/race.entity").Race>;
    getStatistics(id: string): Promise<{
        raceId: string;
        raceName: string;
        totalRegistrations: number;
        availableSpots: number;
        registrationPercentage: number;
    }>;
    update(id: string, updateRaceDto: UpdateRaceDto): Promise<import("../entities/race.entity").Race>;
    updateStatus(id: string, status: RaceStatus): Promise<import("../entities/race.entity").Race>;
    remove(id: string): Promise<void>;
}
