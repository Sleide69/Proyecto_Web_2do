"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Registration = void 0;
const base_entity_1 = require("./base.entity");
const enums_1 = require("../enums");
/**
 * Entidad Registration - Representa una inscripción de competidor en una carrera
 */
class Registration extends base_entity_1.BaseEntity {
    constructor(data = {}) {
        super(data.id);
        this.raceId = data.raceId || '';
        this.competitorId = data.competitorId || '';
        this.status = data.status || enums_1.RegistrationStatus.PENDING;
        this.registrationDate = data.registrationDate || new Date();
        this.confirmationCode = data.confirmationCode || this.generateConfirmationCode();
        this.notes = data.notes;
        // Relaciones opcionales
        this.race = data.race;
        this.competitor = data.competitor;
        if (data.createdAt) {
            this.createdAt = data.createdAt;
        }
        if (data.updatedAt) {
            this.updatedAt = data.updatedAt;
        }
    }
    /**
     * Genera un código de confirmación único
     */
    generateConfirmationCode() {
        const timestamp = Date.now().toString();
        const random = Math.random().toString(36).substring(2, 8).toUpperCase();
        return `REG-${timestamp.slice(-4)}-${random}`;
    }
    /**
     * Confirma la inscripción
     */
    confirm() {
        this.status = enums_1.RegistrationStatus.CONFIRMED;
        this.touch();
    }
    /**
     * Cancela la inscripción
     */
    cancel() {
        this.status = enums_1.RegistrationStatus.CANCELLED;
        this.touch();
    }
    /**
     * Marca la inscripción como completada
     */
    complete() {
        this.status = enums_1.RegistrationStatus.COMPLETED;
        this.touch();
    }
    /**
     * Verifica si la inscripción está activa
     */
    isActive() {
        return this.status === enums_1.RegistrationStatus.CONFIRMED ||
            this.status === enums_1.RegistrationStatus.PENDING;
    }
    /**
     * Verifica si la inscripción puede ser cancelada
     */
    canBeCancelled() {
        return this.status === enums_1.RegistrationStatus.PENDING ||
            this.status === enums_1.RegistrationStatus.CONFIRMED;
    }
    /**
     * Actualiza las notas de la inscripción
     */
    updateNotes(notes) {
        this.notes = notes;
        this.touch();
    }
    /**
     * Serialización completa incluyendo campos específicos
     */
    toJSON() {
        return {
            ...super.toJSON(),
            raceId: this.raceId,
            competitorId: this.competitorId,
            status: this.status,
            registrationDate: this.registrationDate,
            confirmationCode: this.confirmationCode,
            notes: this.notes,
            race: this.race,
            competitor: this.competitor,
        };
    }
    /**
     * Crea una instancia desde datos planos
     */
    static fromJSON(data) {
        return new Registration({
            ...data,
            registrationDate: new Date(data.registrationDate),
            createdAt: new Date(data.createdAt),
            updatedAt: new Date(data.updatedAt),
        });
    }
}
exports.Registration = Registration;
//# sourceMappingURL=registration.entity.js.map