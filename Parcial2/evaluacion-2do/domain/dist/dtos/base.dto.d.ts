import { RaceType, RaceStatus, ShirtType, ShirtSize } from '../enums';
/**
 * DTO para crear una nueva carrera
 */
export declare class CreateRaceDto {
    name: string;
    description: string;
    type: RaceType;
    eventDate: string;
    registrationStartDate: string;
    registrationEndDate: string;
    location: string;
    distance: string;
    maxParticipants: number;
    registrationFee: number;
    status?: RaceStatus;
}
/**
 * DTO para actualizar una carrera
 */
export declare class UpdateRaceDto {
    name?: string;
    description?: string;
    type?: RaceType;
    eventDate?: string;
    registrationStartDate?: string;
    registrationEndDate?: string;
    location?: string;
    distance?: string;
    maxParticipants?: number;
    registrationFee?: number;
    status?: RaceStatus;
}
/**
 * DTO para crear un competidor
 */
export declare class CreateCompetitorDto {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    shirtType: ShirtType;
    shirtSize: ShirtSize;
}
/**
 * DTO para actualizar un competidor
 */
export declare class UpdateCompetitorDto {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    shirtType?: ShirtType;
    shirtSize?: ShirtSize;
}
//# sourceMappingURL=base.dto.d.ts.map