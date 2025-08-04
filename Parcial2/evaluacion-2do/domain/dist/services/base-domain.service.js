"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDomainService = void 0;
/**
 * Clase base para servicios de dominio
 * Proporciona funcionalidad común como validación y eventos
 */
class BaseDomainService {
    constructor(eventPublisher) {
        this.eventPublisher = eventPublisher;
    }
    /**
     * Publica un evento de dominio
     */
    async publishEvent(eventType, aggregateId, data, version = 1) {
        if (!this.eventPublisher) {
            return;
        }
        const event = {
            eventType,
            aggregateId,
            data,
            timestamp: new Date(),
            version,
        };
        await this.eventPublisher.publish(event);
    }
    /**
     * Valida que un ID sea válido (UUID v4)
     */
    validateId(id) {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        return uuidRegex.test(id);
    }
    /**
     * Valida que una fecha sea válida y no esté en el pasado
     */
    validateFutureDate(date, allowToday = false) {
        const now = new Date();
        if (allowToday) {
            now.setHours(0, 0, 0, 0);
            date.setHours(0, 0, 0, 0);
            return date >= now;
        }
        return date > now;
    }
    /**
     * Valida que una fecha de inicio sea anterior a una fecha de fin
     */
    validateDateRange(startDate, endDate) {
        return startDate < endDate;
    }
    /**
     * Maneja errores comunes y los transforma en mensajes útiles
     */
    handleError(error, context) {
        if (error instanceof Error) {
            return new Error(`${context}: ${error.message}`);
        }
        return new Error(`${context}: ${String(error)}`);
    }
    /**
     * Aplica filtros de paginación a un array
     */
    applyPagination(items, page = 1, limit = 10) {
        const total = items.length;
        const totalPages = Math.ceil(total / limit);
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        return {
            items: items.slice(startIndex, endIndex),
            total,
            page,
            totalPages,
        };
    }
    /**
     * Aplica filtros de ordenamiento a un array
     */
    applySorting(items, sortBy, sortOrder = 'asc') {
        return items.sort((a, b) => {
            const aValue = a[sortBy];
            const bValue = b[sortBy];
            if (aValue === bValue)
                return 0;
            if (sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1;
            }
            else {
                return aValue < bValue ? 1 : -1;
            }
        });
    }
    /**
     * Sanitiza texto de entrada eliminando caracteres peligrosos
     */
    sanitizeText(text) {
        return text
            .trim()
            .replace(/[<>]/g, '') // Eliminar < y >
            .replace(/\s+/g, ' '); // Normalizar espacios
    }
    /**
     * Genera un código alfanumérico aleatorio
     */
    generateCode(length = 8, prefix = '') {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = prefix;
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
    /**
     * Calcula la diferencia en días entre dos fechas
     */
    daysBetween(date1, date2) {
        const timeDiff = Math.abs(date2.getTime() - date1.getTime());
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
    }
    /**
     * Verifica si un email tiene formato válido
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    /**
     * Verifica si un número de teléfono tiene formato válido
     */
    isValidPhone(phone) {
        const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
        return phoneRegex.test(phone);
    }
}
exports.BaseDomainService = BaseDomainService;
//# sourceMappingURL=base-domain.service.js.map