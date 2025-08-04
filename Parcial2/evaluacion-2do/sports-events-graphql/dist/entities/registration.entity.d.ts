import { Race } from './race.entity';
import { Competitor } from './competitor.entity';
import { Payment } from './payment.entity';
export declare enum RegistrationStatus {
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    CANCELLED = "CANCELLED",
    COMPLETED = "COMPLETED"
}
export declare class Registration {
    id: string;
    raceId: string;
    competitorId: string;
    paymentId?: string;
    status: RegistrationStatus;
    registrationDate: Date;
    confirmationCode?: string;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
    race?: Race;
    competitor?: Competitor;
    payment?: Payment;
    constructor(data?: Partial<Registration>);
    generateConfirmationCode(): string;
}
