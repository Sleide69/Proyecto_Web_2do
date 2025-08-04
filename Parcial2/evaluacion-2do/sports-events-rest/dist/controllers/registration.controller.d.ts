import { RegistrationService } from '../services/registration.service';
import { CreateRegistrationDto, UpdateRegistrationDto } from '../dto/registration.dto';
export declare class RegistrationController {
    private readonly registrationService;
    constructor(registrationService: RegistrationService);
    create(createRegistrationDto: CreateRegistrationDto): Promise<import("../entities").Registration>;
    findAll(): Promise<import("../entities").Registration[]>;
    findOne(id: string): Promise<import("../entities").Registration>;
    getSummary(id: string): Promise<import("../dto/registration.dto").RegistrationSummaryDto>;
    findByRace(raceId: string): Promise<import("../entities").Registration[]>;
    findByCompetitor(competitorId: string): Promise<import("../entities").Registration[]>;
    update(id: string, updateRegistrationDto: UpdateRegistrationDto): Promise<import("../entities").Registration>;
    confirm(id: string): Promise<import("../entities").Registration>;
    cancel(id: string): Promise<import("../entities").Registration>;
}
