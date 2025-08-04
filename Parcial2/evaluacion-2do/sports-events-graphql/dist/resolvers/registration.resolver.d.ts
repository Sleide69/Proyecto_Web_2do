import { RegistrationService } from '../services/registration.service';
import { Registration } from '../entities/registration.entity';
import { CreateRegistrationInput, UpdateRegistrationInput } from '../inputs/registration.input';
export declare class RegistrationResolver {
    private readonly registrationService;
    constructor(registrationService: RegistrationService);
    createRegistration(input: CreateRegistrationInput): Promise<Registration>;
    registrations(): Promise<Registration[]>;
    registration(id: string): Promise<Registration>;
    registrationsByRace(raceId: string): Promise<Registration[]>;
    updateRegistration(id: string, input: UpdateRegistrationInput): Promise<Registration>;
    confirmRegistration(id: string): Promise<Registration>;
    cancelRegistration(id: string): Promise<Registration>;
}
