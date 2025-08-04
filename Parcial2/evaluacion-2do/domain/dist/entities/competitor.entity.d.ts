import { BaseEntity } from './base.entity';
import { ShirtType, ShirtSize } from '../enums';
/**
 * Entidad Competitor - Representa un competidor/participante
 */
export declare class Competitor extends BaseEntity {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    shirtType: ShirtType;
    shirtSize: ShirtSize;
    constructor(data?: Partial<Competitor>);
    /**
     * Obtiene el nombre completo del competidor
     */
    get fullName(): string;
    /**
     * Valida que los datos del competidor sean válidos
     */
    validate(): string[];
    /**
     * Valida formato de email
     */
    private isValidEmail;
    /**
     * Actualiza la información de la camiseta
     */
    updateShirtInfo(type: ShirtType, size: ShirtSize): void;
    /**
     * Serialización completa incluyendo campos específicos
     */
    toJSON(): Record<string, any>;
    /**
     * Crea una instancia desde datos planos
     */
    static fromJSON(data: any): Competitor;
}
//# sourceMappingURL=competitor.entity.d.ts.map