import { Race, Competitor, Registration, Payment } from '../entities';
import { CreateRaceDto, UpdateRaceDto, CreateCompetitorDto, CreateRegistrationDto, CreatePaymentDto, RegistrationSummaryDto } from '../dtos';
import { IRaceFilters, IRegistrationFilters } from './repositories.interface';
/**
 * Interface para el servicio de carreras
 */
export interface IRaceService {
    createRace(dto: CreateRaceDto): Promise<Race>;
    getAllRaces(): Promise<Race[]>;
    getRaceById(id: string): Promise<Race | null>;
    updateRace(id: string, dto: UpdateRaceDto): Promise<Race | null>;
    deleteRace(id: string): Promise<boolean>;
    getAvailableRaces(): Promise<Race[]>;
    getRacesByFilters(filters: IRaceFilters): Promise<Race[]>;
    updateRaceStatus(id: string, status: string): Promise<Race | null>;
    getRaceParticipantsCount(id: string): Promise<number>;
    isRaceAvailableForRegistration(id: string): Promise<boolean>;
}
/**
 * Interface para el servicio de competidores
 */
export interface ICompetitorService {
    createCompetitor(dto: CreateCompetitorDto): Promise<Competitor>;
    getAllCompetitors(): Promise<Competitor[]>;
    getCompetitorById(id: string): Promise<Competitor | null>;
    getCompetitorByEmail(email: string): Promise<Competitor | null>;
    updateCompetitor(id: string, dto: Partial<CreateCompetitorDto>): Promise<Competitor | null>;
    deleteCompetitor(id: string): Promise<boolean>;
    searchCompetitorsByEmail(pattern: string): Promise<Competitor[]>;
    validateCompetitorData(dto: CreateCompetitorDto): Promise<string[]>;
}
/**
 * Interface para el servicio de inscripciones
 */
export interface IRegistrationService {
    createRegistration(dto: CreateRegistrationDto): Promise<Registration>;
    getAllRegistrations(): Promise<Registration[]>;
    getRegistrationById(id: string): Promise<Registration | null>;
    getRegistrationsByRace(raceId: string): Promise<Registration[]>;
    getRegistrationsByCompetitor(competitorId: string): Promise<Registration[]>;
    getRegistrationsByFilters(filters: IRegistrationFilters): Promise<Registration[]>;
    updateRegistration(id: string, dto: Partial<CreateRegistrationDto>): Promise<Registration | null>;
    confirmRegistration(id: string): Promise<Registration | null>;
    cancelRegistration(id: string): Promise<Registration | null>;
    getRegistrationSummary(id: string): Promise<RegistrationSummaryDto | null>;
    validateRegistration(dto: CreateRegistrationDto): Promise<string[]>;
    canRegisterCompetitorInRace(competitorEmail: string, raceId: string): Promise<boolean>;
}
/**
 * Interface para el servicio de pagos
 */
export interface IPaymentService {
    createPayment(dto: CreatePaymentDto): Promise<Payment>;
    getAllPayments(): Promise<Payment[]>;
    getPaymentById(id: string): Promise<Payment | null>;
    getPaymentByRegistration(registrationId: string): Promise<Payment | null>;
    getPaymentByTransaction(transactionId: string): Promise<Payment | null>;
    updatePayment(id: string, data: Partial<CreatePaymentDto>): Promise<Payment | null>;
    confirmPayment(id: string): Promise<Payment | null>;
    cancelPayment(id: string): Promise<Payment | null>;
    refundPayment(id: string): Promise<Payment | null>;
    processPayment(id: string): Promise<Payment | null>;
    validatePaymentAmount(registrationId: string, amount: number): Promise<boolean>;
    calculateRevenue(from?: Date, to?: Date): Promise<number>;
    getPaymentsByStatus(status: string): Promise<Payment[]>;
}
/**
 * Interface para eventos del dominio
 */
export interface IDomainEvent {
    eventType: string;
    aggregateId: string;
    data: any;
    timestamp: Date;
    version: number;
}
/**
 * Interface para el publisher de eventos
 */
export interface IEventPublisher {
    publish(event: IDomainEvent): Promise<void>;
    publishMultiple(events: IDomainEvent[]): Promise<void>;
}
/**
 * Interface para el subscriber de eventos
 */
export interface IEventSubscriber {
    handle(event: IDomainEvent): Promise<void>;
    canHandle(eventType: string): boolean;
}
/**
 * Tipos de eventos del dominio
 */
export declare enum DomainEventType {
    RACE_CREATED = "race.created",
    RACE_UPDATED = "race.updated",
    RACE_DELETED = "race.deleted",
    RACE_STATUS_CHANGED = "race.status.changed",
    COMPETITOR_CREATED = "competitor.created",
    COMPETITOR_UPDATED = "competitor.updated",
    COMPETITOR_DELETED = "competitor.deleted",
    REGISTRATION_CREATED = "registration.created",
    REGISTRATION_CONFIRMED = "registration.confirmed",
    REGISTRATION_CANCELLED = "registration.cancelled",
    REGISTRATION_COMPLETED = "registration.completed",
    PAYMENT_CREATED = "payment.created",
    PAYMENT_PROCESSING = "payment.processing",
    PAYMENT_COMPLETED = "payment.completed",
    PAYMENT_FAILED = "payment.failed",
    PAYMENT_CANCELLED = "payment.cancelled",
    PAYMENT_REFUNDED = "payment.refunded"
}
//# sourceMappingURL=services.interface.d.ts.map