"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEntity = void 0;
const uuid_1 = require("uuid");
/**
 * Clase base para todas las entidades del dominio
 * Proporciona funcionalidad común como ID, timestamps y serialización
 */
class BaseEntity {
    constructor(id) {
        this.id = id || (0, uuid_1.v4)();
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
    /**
     * Actualiza el timestamp de modificación
     */
    touch() {
        this.updatedAt = new Date();
    }
    /**
     * Convierte la entidad a un objeto plano para serialización
     */
    toJSON() {
        return {
            id: this.id,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
    /**
     * Compara dos entidades por su ID
     */
    equals(other) {
        return this.id === other.id;
    }
}
exports.BaseEntity = BaseEntity;
//# sourceMappingURL=base.entity.js.map