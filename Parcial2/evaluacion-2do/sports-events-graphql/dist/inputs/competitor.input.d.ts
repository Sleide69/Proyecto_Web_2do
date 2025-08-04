import { ShirtType, ShirtSize } from '../entities/competitor.entity';
export declare class CreateCompetitorInput {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    shirtType: ShirtType;
    shirtSize: ShirtSize;
}
export declare class UpdateCompetitorInput {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    shirtType?: ShirtType;
    shirtSize?: ShirtSize;
}
