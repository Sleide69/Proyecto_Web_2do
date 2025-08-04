import { BaseEntity } from './base.entity';
import { RegistrationStatus } from '../enums';
/**
 * Entidad Registration - Representa una inscripción de competidor en una carrera
 */
export declare class Registration extends BaseEntity {
    raceId: string;
    competitorId: string;
    status: RegistrationStatus;
    registrationDate: Date;
    confirmationCode: string;
    notes?: string;
    race?: any;
    competitor?: any;
    constructor(data?: Partial<Registration>);
    /**
     * Genera un código de confirmación único
     */
    private generateConfirmationCode;
    /**
     * Confirma la inscripción
     */
    confirm(): void;
    /**
     * Cancela la inscripción
     */
    cancel(): void;
    /**
     * Marca la inscripción como completada
     */
    complete(): void;
    /**
     * Verifica si la inscripción está activa
     */
    isActive(): boolean;
    /**
     * Verifica si la inscripción puede ser cancelada
     */
    canBeCancelled(): boolean;
    /**
     * Actualiza las notas de la inscripción
     */
    updateNotes(notes: string): void;
    /**
     * Serialización completa incluyendo campos específicos
     */
    toJSON(): Record<string, any>;
    /**
     * Crea una instancia desde datos planos
     */
    static fromJSON(data: any): Registration;
}
//# sourceMappingURL=registration.entity.d.ts.map