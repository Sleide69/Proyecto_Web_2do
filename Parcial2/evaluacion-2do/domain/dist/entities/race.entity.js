"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Race = void 0;
const base_entity_1 = require("./base.entity");
const enums_1 = require("../enums");
/**
 * Entidad Race - Representa una carrera deportiva
 */
class Race extends base_entity_1.BaseEntity {
    constructor(data = {}) {
        super(data.id);
        this.name = data.name || '';
        this.description = data.description || '';
        this.type = data.type || enums_1.RaceType.FIVE_K;
        this.eventDate = data.eventDate || new Date();
        this.registrationStartDate = data.registrationStartDate || new Date();
        this.registrationEndDate = data.registrationEndDate || new Date();
        this.location = data.location || '';
        this.distance = data.distance || '';
        this.maxParticipants = data.maxParticipants || 100;
        this.registrationFee = data.registrationFee || 0;
        this.status = data.status || enums_1.RaceStatus.PLANNED;
        if (data.createdAt) {
            this.createdAt = data.createdAt;
        }
        if (data.updatedAt) {
            this.updatedAt = data.updatedAt;
        }
    }
    /**
     * Verifica si la carrera está disponible para registro
     */
    isAvailableForRegistration() {
        const now = new Date();
        return (this.status === enums_1.RaceStatus.OPEN_REGISTRATION &&
            now >= this.registrationStartDate &&
            now <= this.registrationEndDate);
    }
    /**
     * Verifica si la carrera está completa (máximo de participantes alcanzado)
     */
    isFull(currentParticipants) {
        return currentParticipants >= this.maxParticipants;
    }
    /**
     * Actualiza el estado de la carrera
     */
    updateStatus(newStatus) {
        this.status = newStatus;
        this.touch();
    }
    /**
     * Serialización completa incluyendo campos específicos
     */
    toJSON() {
        return {
            ...super.toJSON(),
            name: this.name,
            description: this.description,
            type: this.type,
            eventDate: this.eventDate,
            registrationStartDate: this.registrationStartDate,
            registrationEndDate: this.registrationEndDate,
            location: this.location,
            distance: this.distance,
            maxParticipants: this.maxParticipants,
            registrationFee: this.registrationFee,
            status: this.status,
        };
    }
    /**
     * Crea una instancia desde datos planos
     */
    static fromJSON(data) {
        return new Race({
            ...data,
            eventDate: new Date(data.eventDate),
            registrationStartDate: new Date(data.registrationStartDate),
            registrationEndDate: new Date(data.registrationEndDate),
            createdAt: new Date(data.createdAt),
            updatedAt: new Date(data.updatedAt),
        });
    }
}
exports.Race = Race;
//# sourceMappingURL=race.entity.js.map