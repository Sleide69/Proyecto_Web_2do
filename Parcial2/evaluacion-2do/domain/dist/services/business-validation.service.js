"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessValidationService = void 0;
const enums_1 = require("../enums");
/**
 * Servicio centralizado para validaciones de negocio
 */
class BusinessValidationService {
    /**
     * Valida la creación de una carrera
     */
    static validateRaceCreation(dto) {
        const errors = [];
        const eventDate = new Date(dto.eventDate);
        const regStartDate = new Date(dto.registrationStartDate);
        const regEndDate = new Date(dto.registrationEndDate);
        const now = new Date();
        // Validar fechas
        if (eventDate <= now) {
            errors.push('Event date must be in the future');
        }
        if (regStartDate >= regEndDate) {
            errors.push('Registration start date must be before end date');
        }
        if (regEndDate >= eventDate) {
            errors.push('Registration must close before the event date');
        }
        // Validar capacidad
        if (dto.maxParticipants < 1) {
            errors.push('Maximum participants must be at least 1');
        }
        if (dto.maxParticipants > 10000) {
            errors.push('Maximum participants cannot exceed 10,000');
        }
        // Validar tarifa
        if (dto.registrationFee < 0) {
            errors.push('Registration fee cannot be negative');
        }
        return errors;
    }
    /**
     * Valida la actualización de una carrera
     */
    static validateRaceUpdate(race, dto, currentParticipants) {
        const errors = [];
        // Si se está reduciendo la capacidad, verificar que no sea menor a los participantes actuales
        if (dto.maxParticipants && dto.maxParticipants < currentParticipants) {
            errors.push(`Cannot reduce capacity below current participants (${currentParticipants})`);
        }
        // No permitir cambiar fechas si la carrera ya está en progreso o completada
        if ((dto.eventDate || dto.registrationStartDate || dto.registrationEndDate) &&
            (race.status === enums_1.RaceStatus.IN_PROGRESS || race.status === enums_1.RaceStatus.COMPLETED)) {
            errors.push('Cannot modify dates for races that are in progress or completed');
        }
        return errors;
    }
    /**
     * Valida si una carrera puede cambiar de estado
     */
    static validateRaceStatusChange(race, newStatus, currentParticipants) {
        const errors = [];
        const now = new Date();
        switch (newStatus) {
            case enums_1.RaceStatus.OPEN_REGISTRATION:
                if (now < race.registrationStartDate) {
                    errors.push('Cannot open registration before the start date');
                }
                if (now > race.registrationEndDate) {
                    errors.push('Cannot open registration after the end date');
                }
                break;
            case enums_1.RaceStatus.CLOSED_REGISTRATION:
                if (race.status !== enums_1.RaceStatus.OPEN_REGISTRATION) {
                    errors.push('Can only close registration from open status');
                }
                break;
            case enums_1.RaceStatus.IN_PROGRESS:
                if (currentParticipants === 0) {
                    errors.push('Cannot start race without participants');
                }
                if (now < race.eventDate) {
                    errors.push('Cannot start race before the event date');
                }
                break;
            case enums_1.RaceStatus.COMPLETED:
                if (race.status !== enums_1.RaceStatus.IN_PROGRESS) {
                    errors.push('Can only complete races that are in progress');
                }
                break;
            case enums_1.RaceStatus.CANCELLED:
                if (race.status === enums_1.RaceStatus.COMPLETED) {
                    errors.push('Cannot cancel completed races');
                }
                break;
        }
        return errors;
    }
    /**
     * Valida la creación de un competidor
     */
    static validateCompetitorCreation(dto) {
        const errors = [];
        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(dto.email)) {
            errors.push('Invalid email format');
        }
        // Validar teléfono
        const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(dto.phone)) {
            errors.push('Invalid phone format');
        }
        // Validar nombres
        if (dto.firstName.length < 2) {
            errors.push('First name must be at least 2 characters');
        }
        if (dto.lastName.length < 2) {
            errors.push('Last name must be at least 2 characters');
        }
        return errors;
    }
    /**
     * Valida la creación de una inscripción
     */
    static validateRegistrationCreation(race, competitorEmail, currentParticipants, existingRegistration) {
        const errors = [];
        // Verificar si ya existe una inscripción activa
        if (existingRegistration && existingRegistration.isActive()) {
            errors.push('Competitor is already registered for this race');
        }
        // Verificar disponibilidad de la carrera
        if (!race.isAvailableForRegistration()) {
            errors.push('Race is not available for registration');
        }
        // Verificar capacidad
        if (race.isFull(currentParticipants)) {
            errors.push('Race has reached maximum capacity');
        }
        // Verificar estado de la carrera
        if (race.status === enums_1.RaceStatus.CANCELLED) {
            errors.push('Cannot register for cancelled races');
        }
        if (race.status === enums_1.RaceStatus.COMPLETED) {
            errors.push('Cannot register for completed races');
        }
        if (race.status === enums_1.RaceStatus.IN_PROGRESS) {
            errors.push('Cannot register for races that are in progress');
        }
        return errors;
    }
    /**
     * Valida la cancelación de una inscripción
     */
    static validateRegistrationCancellation(registration, race) {
        const errors = [];
        if (!registration.canBeCancelled()) {
            errors.push('Registration cannot be cancelled in its current status');
        }
        // No permitir cancelaciones si la carrera ya empezó
        if (race.status === enums_1.RaceStatus.IN_PROGRESS || race.status === enums_1.RaceStatus.COMPLETED) {
            errors.push('Cannot cancel registration for races that have started or completed');
        }
        // Verificar tiempo límite para cancelación
        const now = new Date();
        const eventDate = race.eventDate;
        const hoursUntilEvent = (eventDate.getTime() - now.getTime()) / (1000 * 60 * 60);
        if (hoursUntilEvent < 24) {
            errors.push('Cannot cancel registration less than 24 hours before the event');
        }
        return errors;
    }
    /**
     * Valida la creación de un pago
     */
    static validatePaymentCreation(dto, registration, race, existingPayment) {
        const errors = [];
        // Verificar si ya existe un pago
        if (existingPayment) {
            errors.push('Payment already exists for this registration');
        }
        // Verificar monto
        if (Math.abs(dto.amount - race.registrationFee) > 0.01) {
            errors.push(`Payment amount (${dto.amount}) does not match registration fee (${race.registrationFee})`);
        }
        // Verificar estado de la inscripción
        if (registration.status === enums_1.RegistrationStatus.CANCELLED) {
            errors.push('Cannot create payment for cancelled registration');
        }
        if (registration.status === enums_1.RegistrationStatus.COMPLETED) {
            errors.push('Cannot create payment for completed registration');
        }
        // Verificar estado de la carrera
        if (race.status === enums_1.RaceStatus.CANCELLED) {
            errors.push('Cannot create payment for cancelled race');
        }
        return errors;
    }
    /**
     * Valida la confirmación de un pago
     */
    static validatePaymentConfirmation(payment) {
        const errors = [];
        if (payment.status !== enums_1.PaymentStatus.PENDING && payment.status !== enums_1.PaymentStatus.PROCESSING) {
            errors.push('Only pending or processing payments can be confirmed');
        }
        if (payment.amount <= 0) {
            errors.push('Payment amount must be greater than zero');
        }
        return errors;
    }
    /**
     * Valida el reembolso de un pago
     */
    static validatePaymentRefund(payment, registration) {
        const errors = [];
        if (!payment.canBeRefunded()) {
            errors.push('Payment cannot be refunded in its current status');
        }
        // Verificar política de reembolso basada en tiempo
        const now = new Date();
        const paymentDate = payment.paymentDate || payment.createdAt;
        const hoursFromPayment = (now.getTime() - paymentDate.getTime()) / (1000 * 60 * 60);
        if (hoursFromPayment > 72) {
            errors.push('Refunds are only allowed within 72 hours of payment');
        }
        return errors;
    }
    /**
     * Calcula tarifas de procesamiento de pago
     */
    static calculateProcessingFee(amount, method) {
        const feeRates = {
            [enums_1.PaymentMethod.CREDIT_CARD]: 0.029, // 2.9%
            [enums_1.PaymentMethod.DEBIT_CARD]: 0.019, // 1.9%
            [enums_1.PaymentMethod.PAYPAL]: 0.034, // 3.4%
            [enums_1.PaymentMethod.BANK_TRANSFER]: 0.01, // 1.0%
            [enums_1.PaymentMethod.CASH]: 0, // 0%
        };
        return amount * (feeRates[method] || 0);
    }
    /**
     * Valida límites de participación por competidor
     */
    static validateParticipationLimits(competitorRegistrations) {
        const errors = [];
        // Verificar límite de carreras activas por competidor
        const activeRegistrations = competitorRegistrations.filter(reg => reg.isActive());
        if (activeRegistrations.length >= 5) {
            errors.push('Competitor has reached the maximum limit of active registrations (5)');
        }
        // Verificar carreras en el mismo día
        const registrationsByDate = new Map();
        activeRegistrations.forEach(reg => {
            if (reg.race) {
                const dateKey = reg.race.eventDate.toDateString();
                if (!registrationsByDate.has(dateKey)) {
                    registrationsByDate.set(dateKey, []);
                }
                registrationsByDate.get(dateKey).push(reg);
            }
        });
        registrationsByDate.forEach((regs, date) => {
            if (regs.length > 1) {
                errors.push(`Competitor cannot participate in multiple races on the same day (${date})`);
            }
        });
        return errors;
    }
}
exports.BusinessValidationService = BusinessValidationService;
//# sourceMappingURL=business-validation.service.js.map