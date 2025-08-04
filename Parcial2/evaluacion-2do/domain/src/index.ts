// Entidades
export * from './entities';

// Enumeraciones
export * from './enums';

// DTOs
export * from './dtos';

// Interfaces
export * from './interfaces';

// Servicios de Dominio
export * from './services';

// Re-exportaciones organizadas por categoría
export {
  // Entidades principales
  BaseEntity,
  Race,
  Competitor,
  Registration,
  Payment,
} from './entities';

export {
  // Enums más utilizados
  RaceType,
  RaceStatus,
  ShirtType,
  ShirtSize,
  RegistrationStatus,
  PaymentMethod,
  PaymentStatus,
} from './enums';

export {
  // DTOs principales
  CreateRaceDto,
  UpdateRaceDto,
  CreateCompetitorDto,
  UpdateCompetitorDto,
  CreateRegistrationDto,
  UpdateRegistrationDto,
  CreatePaymentDto,
  RegistrationSummaryDto,
} from './dtos';

export {
  // Interfaces de servicios
  IRaceService,
  ICompetitorService,
  IRegistrationService,
  IPaymentService,
  IEventPublisher,
  IEventSubscriber,
  IDomainEvent,
  DomainEventType,
  
  // Interfaces de repositorios
  IRepository,
  IRaceRepository,
  ICompetitorRepository,
  IRegistrationRepository,
  IPaymentRepository,
  IPersistenceService,
  
  // Tipos de filtros
  IRaceFilters,
  IRegistrationFilters,
} from './interfaces';

export {
  // Servicios de dominio
  BaseDomainService,
  BusinessValidationService,
} from './services';
