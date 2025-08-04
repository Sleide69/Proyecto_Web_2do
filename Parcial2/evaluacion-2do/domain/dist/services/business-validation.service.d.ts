import { RaceStatus, PaymentMethod } from '../enums';
import { Race, Registration, Payment } from '../entities';
import { CreateRaceDto, CreateCompetitorDto, CreatePaymentDto } from '../dtos';
/**
 * Servicio centralizado para validaciones de negocio
 */
export declare class BusinessValidationService {
    /**
     * Valida la creación de una carrera
     */
    static validateRaceCreation(dto: CreateRaceDto): string[];
    /**
     * Valida la actualización de una carrera
     */
    static validateRaceUpdate(race: Race, dto: Partial<CreateRaceDto>, currentParticipants: number): string[];
    /**
     * Valida si una carrera puede cambiar de estado
     */
    static validateRaceStatusChange(race: Race, newStatus: RaceStatus, currentParticipants: number): string[];
    /**
     * Valida la creación de un competidor
     */
    static validateCompetitorCreation(dto: CreateCompetitorDto): string[];
    /**
     * Valida la creación de una inscripción
     */
    static validateRegistrationCreation(race: Race, competitorEmail: string, currentParticipants: number, existingRegistration?: Registration): string[];
    /**
     * Valida la cancelación de una inscripción
     */
    static validateRegistrationCancellation(registration: Registration, race: Race): string[];
    /**
     * Valida la creación de un pago
     */
    static validatePaymentCreation(dto: CreatePaymentDto, registration: Registration, race: Race, existingPayment?: Payment): string[];
    /**
     * Valida la confirmación de un pago
     */
    static validatePaymentConfirmation(payment: Payment): string[];
    /**
     * Valida el reembolso de un pago
     */
    static validatePaymentRefund(payment: Payment, registration: Registration): string[];
    /**
     * Calcula tarifas de procesamiento de pago
     */
    static calculateProcessingFee(amount: number, method: PaymentMethod): number;
    /**
     * Valida límites de participación por competidor
     */
    static validateParticipationLimits(competitorRegistrations: Registration[]): string[];
}
//# sourceMappingURL=business-validation.service.d.ts.map