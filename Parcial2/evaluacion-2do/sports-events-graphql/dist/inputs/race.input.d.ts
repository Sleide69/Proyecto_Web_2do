import { RaceType, RaceStatus } from '../entities/race.entity';
export declare class CreateRaceInput {
    name: string;
    description?: string;
    type: RaceType;
    eventDate: Date;
    registrationStartDate: Date;
    registrationEndDate: Date;
    location: string;
    distance: string;
    maxParticipants: number;
    registrationFee: number;
    status?: RaceStatus;
}
export declare class UpdateRaceInput {
    name?: string;
    description?: string;
    type?: RaceType;
    eventDate?: Date;
    registrationStartDate?: Date;
    registrationEndDate?: Date;
    location?: string;
    distance?: string;
    maxParticipants?: number;
    registrationFee?: number;
    status?: RaceStatus;
}
