import { BaseEntity } from './base.entity';
import { RaceType, RaceStatus } from '../enums';
/**
 * Entidad Race - Representa una carrera deportiva
 */
export declare class Race extends BaseEntity {
    name: string;
    description: string;
    type: RaceType;
    eventDate: Date;
    registrationStartDate: Date;
    registrationEndDate: Date;
    location: string;
    distance: string;
    maxParticipants: number;
    registrationFee: number;
    status: RaceStatus;
    constructor(data?: Partial<Race>);
    /**
     * Verifica si la carrera está disponible para registro
     */
    isAvailableForRegistration(): boolean;
    /**
     * Verifica si la carrera está completa (máximo de participantes alcanzado)
     */
    isFull(currentParticipants: number): boolean;
    /**
     * Actualiza el estado de la carrera
     */
    updateStatus(newStatus: RaceStatus): void;
    /**
     * Serialización completa incluyendo campos específicos
     */
    toJSON(): Record<string, any>;
    /**
     * Crea una instancia desde datos planos
     */
    static fromJSON(data: any): Race;
}
//# sourceMappingURL=race.entity.d.ts.map