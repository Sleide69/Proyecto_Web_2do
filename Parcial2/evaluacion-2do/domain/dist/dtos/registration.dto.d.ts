import { PaymentMethod, RegistrationStatus } from '../enums';
import { CreateCompetitorDto } from './base.dto';
/**
 * DTO para crear una inscripción con competidor embebido
 */
export declare class CreateRegistrationDto {
    raceId: string;
    competitor: CreateCompetitorDto;
    notes?: string;
}
/**
 * DTO para actualizar una inscripción
 */
export declare class UpdateRegistrationDto {
    status?: RegistrationStatus;
    notes?: string;
}
/**
 * DTO para crear un pago
 */
export declare class CreatePaymentDto {
    registrationId: string;
    amount: number;
    method: PaymentMethod;
    transactionId: string;
    description?: string;
}
/**
 * DTO para el resumen completo de inscripción
 */
export declare class RegistrationSummaryDto {
    registration: {
        id: string;
        raceId: string;
        competitorId: string;
        status: RegistrationStatus;
        registrationDate: Date;
        confirmationCode: string;
        notes?: string;
        createdAt: Date;
        updatedAt: Date;
    };
    race: {
        id: string;
        name: string;
        description: string;
        type: string;
        eventDate: Date;
        location: string;
        distance: string;
        registrationFee: number;
        status: string;
    };
    competitor: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        shirtType: string;
        shirtSize: string;
        fullName: string;
    };
    payment?: {
        id: string;
        amount: number;
        method: PaymentMethod;
        status: string;
        transactionId: string;
        description?: string;
        paymentDate?: Date;
        fee: number;
        netAmount: number;
    } | null;
}
//# sourceMappingURL=registration.dto.d.ts.map