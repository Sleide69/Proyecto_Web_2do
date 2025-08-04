import { RegistrationStatus } from '../entities/registration.entity';
import { CreateCompetitorDto } from './competitor.dto';
import { CreatePaymentDto } from './payment.dto';
export declare class CreateRegistrationDto {
    raceId: string;
    competitor: CreateCompetitorDto;
    payment?: CreatePaymentDto;
    notes?: string;
}
export declare class UpdateRegistrationDto {
    status?: RegistrationStatus;
    notes?: string;
}
export declare class RegistrationSummaryDto {
    id: string;
    confirmationCode: string;
    status: RegistrationStatus;
    registrationDate: Date;
    race: {
        id: string;
        name: string;
        type: string;
        eventDate: Date;
        location: string;
        distance: string;
        registrationFee: number;
    };
    competitor: {
        id: string;
        fullName: string;
        email: string;
        phone: string;
        shirtType: string;
        shirtSize: string;
    };
    payment?: {
        id: string;
        amount: number;
        method: string;
        status: string;
        transactionId?: string;
        paymentDate?: Date;
    };
}
