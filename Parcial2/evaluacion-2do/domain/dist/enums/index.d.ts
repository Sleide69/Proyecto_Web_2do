/**
 * Tipos de carreras deportivas disponibles
 */
export declare enum RaceType {
    MARATHON = "MARATHON",
    HALF_MARATHON = "HALF_MARATHON",
    TEN_K = "TEN_K",
    FIVE_K = "FIVE_K",
    TRAIL = "TRAIL",
    TRIATHLON = "TRIATHLON",
    CYCLING = "CYCLING"
}
/**
 * Estados posibles de una carrera
 */
export declare enum RaceStatus {
    PLANNED = "PLANNED",
    OPEN_REGISTRATION = "OPEN_REGISTRATION",
    CLOSED_REGISTRATION = "CLOSED_REGISTRATION",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED"
}
/**
 * Tipos de camisetas disponibles
 */
export declare enum ShirtType {
    COTTON = "COTTON",
    POLYESTER = "POLYESTER",
    COTTON_BLEND = "COTTON_BLEND",
    DRI_FIT = "DRI_FIT"
}
/**
 * Tallas de camisetas disponibles
 */
export declare enum ShirtSize {
    XS = "XS",
    S = "S",
    M = "M",
    L = "L",
    XL = "XL",
    XXL = "XXL"
}
/**
 * Estados de inscripción
 */
export declare enum RegistrationStatus {
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    CANCELLED = "CANCELLED",
    COMPLETED = "COMPLETED"
}
/**
 * Métodos de pago disponibles
 */
export declare enum PaymentMethod {
    CREDIT_CARD = "CREDIT_CARD",
    DEBIT_CARD = "DEBIT_CARD",
    BANK_TRANSFER = "BANK_TRANSFER",
    PAYPAL = "PAYPAL",
    CASH = "CASH"
}
/**
 * Estados de pago
 */
export declare enum PaymentStatus {
    PENDING = "PENDING",
    PROCESSING = "PROCESSING",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED",
    CANCELLED = "CANCELLED",
    REFUNDED = "REFUNDED"
}
//# sourceMappingURL=index.d.ts.map