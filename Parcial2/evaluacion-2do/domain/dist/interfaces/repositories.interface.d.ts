/**
 * Interface genérica para repositorios
 */
export interface IRepository<T> {
    findAll(): Promise<T[]>;
    findById(id: string): Promise<T | null>;
    create(entity: T): Promise<T>;
    update(id: string, data: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<boolean>;
}
/**
 * Filtros para consultas de carreras
 */
export interface IRaceFilters {
    status?: string[];
    type?: string[];
    location?: string;
    dateFrom?: Date;
    dateTo?: Date;
    available?: boolean;
}
/**
 * Interface específica para el repositorio de carreras
 */
export interface IRaceRepository extends IRepository<any> {
    findByStatus(status: string): Promise<any[]>;
    findByType(type: string): Promise<any[]>;
    findAvailableForRegistration(): Promise<any[]>;
    findByFilters(filters: IRaceFilters): Promise<any[]>;
    countParticipants(raceId: string): Promise<number>;
}
/**
 * Interface específica para el repositorio de competidores
 */
export interface ICompetitorRepository extends IRepository<any> {
    findByEmail(email: string): Promise<any | null>;
    findByEmailPattern(pattern: string): Promise<any[]>;
    existsByEmail(email: string): Promise<boolean>;
}
/**
 * Filtros para consultas de inscripciones
 */
export interface IRegistrationFilters {
    raceId?: string;
    competitorId?: string;
    status?: string[];
    dateFrom?: Date;
    dateTo?: Date;
}
/**
 * Interface específica para el repositorio de inscripciones
 */
export interface IRegistrationRepository extends IRepository<any> {
    findByRaceId(raceId: string): Promise<any[]>;
    findByCompetitorId(competitorId: string): Promise<any[]>;
    findByStatus(status: string): Promise<any[]>;
    findByFilters(filters: IRegistrationFilters): Promise<any[]>;
    findWithRelations(id: string): Promise<any | null>;
    existsByRaceAndCompetitor(raceId: string, competitorId: string): Promise<boolean>;
    countByRaceId(raceId: string): Promise<number>;
}
/**
 * Interface específica para el repositorio de pagos
 */
export interface IPaymentRepository extends IRepository<any> {
    findByRegistrationId(registrationId: string): Promise<any | null>;
    findByTransactionId(transactionId: string): Promise<any | null>;
    findByStatus(status: string): Promise<any[]>;
    findByMethod(method: string): Promise<any[]>;
    findByDateRange(from: Date, to: Date): Promise<any[]>;
    getTotalRevenue(): Promise<number>;
    getRevenueByPeriod(from: Date, to: Date): Promise<number>;
}
/**
 * Interface para persistencia de datos
 */
export interface IPersistenceService {
    load<T>(collection: string): Promise<T[]>;
    save<T>(collection: string, data: T[]): Promise<void>;
    backup(collection: string): Promise<void>;
    restore(collection: string): Promise<void>;
}
//# sourceMappingURL=repositories.interface.d.ts.map