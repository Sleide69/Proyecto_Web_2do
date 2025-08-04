"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Competitor = void 0;
const base_entity_1 = require("./base.entity");
const enums_1 = require("../enums");
/**
 * Entidad Competitor - Representa un competidor/participante
 */
class Competitor extends base_entity_1.BaseEntity {
    constructor(data = {}) {
        super(data.id);
        this.firstName = data.firstName || '';
        this.lastName = data.lastName || '';
        this.email = data.email || '';
        this.phone = data.phone || '';
        this.shirtType = data.shirtType || enums_1.ShirtType.COTTON;
        this.shirtSize = data.shirtSize || enums_1.ShirtSize.M;
        if (data.createdAt) {
            this.createdAt = data.createdAt;
        }
        if (data.updatedAt) {
            this.updatedAt = data.updatedAt;
        }
    }
    /**
     * Obtiene el nombre completo del competidor
     */
    get fullName() {
        return `${this.firstName} ${this.lastName}`.trim();
    }
    /**
     * Valida que los datos del competidor sean válidos
     */
    validate() {
        const errors = [];
        if (!this.firstName.trim()) {
            errors.push('First name is required');
        }
        if (!this.lastName.trim()) {
            errors.push('Last name is required');
        }
        if (!this.email.trim()) {
            errors.push('Email is required');
        }
        if (!this.isValidEmail(this.email)) {
            errors.push('Email format is invalid');
        }
        if (!this.phone.trim()) {
            errors.push('Phone is required');
        }
        return errors;
    }
    /**
     * Valida formato de email
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    /**
     * Actualiza la información de la camiseta
     */
    updateShirtInfo(type, size) {
        this.shirtType = type;
        this.shirtSize = size;
        this.touch();
    }
    /**
     * Serialización completa incluyendo campos específicos
     */
    toJSON() {
        return {
            ...super.toJSON(),
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phone: this.phone,
            shirtType: this.shirtType,
            shirtSize: this.shirtSize,
            fullName: this.fullName,
        };
    }
    /**
     * Crea una instancia desde datos planos
     */
    static fromJSON(data) {
        return new Competitor({
            ...data,
            createdAt: new Date(data.createdAt),
            updatedAt: new Date(data.updatedAt),
        });
    }
}
exports.Competitor = Competitor;
//# sourceMappingURL=competitor.entity.js.map