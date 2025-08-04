import { RegistrationStatus } from '../entities/registration.entity';
import { CreateCompetitorInput } from './competitor.input';
import { CreatePaymentInput } from './payment.input';
export declare class CreateRegistrationInput {
    raceId: string;
    competitor: CreateCompetitorInput;
    payment?: CreatePaymentInput;
    notes?: string;
}
export declare class UpdateRegistrationInput {
    status?: RegistrationStatus;
    notes?: string;
}
