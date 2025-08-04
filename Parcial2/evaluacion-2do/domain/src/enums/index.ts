/**
 * Tipos de carreras deportivas disponibles
 */
export enum RaceType {
  MARATHON = 'MARATHON',
  HALF_MARATHON = 'HALF_MARATHON',
  TEN_K = 'TEN_K',
  FIVE_K = 'FIVE_K',
  TRAIL = 'TRAIL',
  TRIATHLON = 'TRIATHLON',
  CYCLING = 'CYCLING',
}

/**
 * Estados posibles de una carrera
 */
export enum RaceStatus {
  PLANNED = 'PLANNED',
  OPEN_REGISTRATION = 'OPEN_REGISTRATION',
  CLOSED_REGISTRATION = 'CLOSED_REGISTRATION',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

/**
 * Tipos de camisetas disponibles
 */
export enum ShirtType {
  COTTON = 'COTTON',
  POLYESTER = 'POLYESTER',
  COTTON_BLEND = 'COTTON_BLEND',
  DRI_FIT = 'DRI_FIT',
}

/**
 * Tallas de camisetas disponibles
 */
export enum ShirtSize {
  XS = 'XS',
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  XXL = 'XXL',
}

/**
 * Estados de inscripción
 */
export enum RegistrationStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}

/**
 * Métodos de pago disponibles
 */
export enum PaymentMethod {
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  BANK_TRANSFER = 'BANK_TRANSFER',
  PAYPAL = 'PAYPAL',
  CASH = 'CASH',
}

/**
 * Estados de pago
 */
export enum PaymentStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
}
