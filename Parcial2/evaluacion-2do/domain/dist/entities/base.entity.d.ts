/**
 * Clase base para todas las entidades del dominio
 * Proporciona funcionalidad común como ID, timestamps y serialización
 */
export declare abstract class BaseEntity {
    readonly id: string;
    readonly createdAt: Date;
    updatedAt: Date;
    constructor(id?: string);
    /**
     * Actualiza el timestamp de modificación
     */
    touch(): void;
    /**
     * Convierte la entidad a un objeto plano para serialización
     */
    toJSON(): Record<string, any>;
    /**
     * Compara dos entidades por su ID
     */
    equals(other: BaseEntity): boolean;
}
//# sourceMappingURL=base.entity.d.ts.map