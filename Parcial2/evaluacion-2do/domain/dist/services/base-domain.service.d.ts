import { IEventPublisher, DomainEventType } from '../interfaces';
/**
 * Clase base para servicios de dominio
 * Proporciona funcionalidad común como validación y eventos
 */
export declare abstract class BaseDomainService {
    protected eventPublisher?: IEventPublisher;
    constructor(eventPublisher?: IEventPublisher);
    /**
     * Publica un evento de dominio
     */
    protected publishEvent(eventType: DomainEventType, aggregateId: string, data: any, version?: number): Promise<void>;
    /**
     * Valida que un ID sea válido (UUID v4)
     */
    protected validateId(id: string): boolean;
    /**
     * Valida que una fecha sea válida y no esté en el pasado
     */
    protected validateFutureDate(date: Date, allowToday?: boolean): boolean;
    /**
     * Valida que una fecha de inicio sea anterior a una fecha de fin
     */
    protected validateDateRange(startDate: Date, endDate: Date): boolean;
    /**
     * Maneja errores comunes y los transforma en mensajes útiles
     */
    protected handleError(error: any, context: string): Error;
    /**
     * Aplica filtros de paginación a un array
     */
    protected applyPagination<T>(items: T[], page?: number, limit?: number): {
        items: T[];
        total: number;
        page: number;
        totalPages: number;
    };
    /**
     * Aplica filtros de ordenamiento a un array
     */
    protected applySorting<T>(items: T[], sortBy: keyof T, sortOrder?: 'asc' | 'desc'): T[];
    /**
     * Sanitiza texto de entrada eliminando caracteres peligrosos
     */
    protected sanitizeText(text: string): string;
    /**
     * Genera un código alfanumérico aleatorio
     */
    protected generateCode(length?: number, prefix?: string): string;
    /**
     * Calcula la diferencia en días entre dos fechas
     */
    protected daysBetween(date1: Date, date2: Date): number;
    /**
     * Verifica si un email tiene formato válido
     */
    protected isValidEmail(email: string): boolean;
    /**
     * Verifica si un número de teléfono tiene formato válido
     */
    protected isValidPhone(phone: string): boolean;
}
//# sourceMappingURL=base-domain.service.d.ts.map