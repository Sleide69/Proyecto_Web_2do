import { ShirtType, ShirtSize } from '../entities/competitor.entity';
export declare class CreateCompetitorDto {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    shirtType: ShirtType;
    shirtSize: ShirtSize;
}
export declare class UpdateCompetitorDto {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    shirtType?: ShirtType;
    shirtSize?: ShirtSize;
}
