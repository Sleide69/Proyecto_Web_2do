"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const base_entity_1 = require("./base.entity");
const enums_1 = require("../enums");
/**
 * Entidad Payment - Representa un pago de inscripción
 */
class Payment extends base_entity_1.BaseEntity {
    constructor(data = {}) {
        super(data.id);
        this.registrationId = data.registrationId || '';
        this.amount = data.amount || 0;
        this.method = data.method || enums_1.PaymentMethod.CREDIT_CARD;
        this.status = data.status || enums_1.PaymentStatus.PENDING;
        this.transactionId = data.transactionId || this.generateTransactionId();
        this.description = data.description;
        this.paymentDate = data.paymentDate;
        // Relación opcional
        this.registration = data.registration;
        if (data.createdAt) {
            this.createdAt = data.createdAt;
        }
        if (data.updatedAt) {
            this.updatedAt = data.updatedAt;
        }
    }
    /**
     * Genera un ID de transacción único
     */
    generateTransactionId() {
        const timestamp = Date.now().toString();
        const random = Math.random().toString(36).substring(2, 8).toUpperCase();
        const methodPrefix = this.method.slice(0, 2);
        return `TXN-${methodPrefix}-${timestamp.slice(-6)}-${random}`;
    }
    /**
     * Inicia el procesamiento del pago
     */
    startProcessing() {
        this.status = enums_1.PaymentStatus.PROCESSING;
        this.touch();
    }
    /**
     * Confirma el pago como completado
     */
    complete() {
        this.status = enums_1.PaymentStatus.COMPLETED;
        this.paymentDate = new Date();
        this.touch();
    }
    /**
     * Marca el pago como fallido
     */
    fail() {
        this.status = enums_1.PaymentStatus.FAILED;
        this.touch();
    }
    /**
     * Cancela el pago
     */
    cancel() {
        this.status = enums_1.PaymentStatus.CANCELLED;
        this.touch();
    }
    /**
     * Procesa un reembolso
     */
    refund() {
        if (this.status !== enums_1.PaymentStatus.COMPLETED) {
            throw new Error('Only completed payments can be refunded');
        }
        this.status = enums_1.PaymentStatus.REFUNDED;
        this.touch();
    }
    /**
     * Verifica si el pago está completado
     */
    isCompleted() {
        return this.status === enums_1.PaymentStatus.COMPLETED;
    }
    /**
     * Verifica si el pago puede ser reembolsado
     */
    canBeRefunded() {
        return this.status === enums_1.PaymentStatus.COMPLETED;
    }
    /**
     * Verifica si el pago está pendiente
     */
    isPending() {
        return this.status === enums_1.PaymentStatus.PENDING ||
            this.status === enums_1.PaymentStatus.PROCESSING;
    }
    /**
     * Actualiza la descripción del pago
     */
    updateDescription(description) {
        this.description = description;
        this.touch();
    }
    /**
     * Calcula la comisión del pago basada en el método
     */
    calculateFee() {
        const feeRates = {
            [enums_1.PaymentMethod.CREDIT_CARD]: 0.029, // 2.9%
            [enums_1.PaymentMethod.DEBIT_CARD]: 0.019, // 1.9%
            [enums_1.PaymentMethod.PAYPAL]: 0.034, // 3.4%
            [enums_1.PaymentMethod.BANK_TRANSFER]: 0.01, // 1.0%
            [enums_1.PaymentMethod.CASH]: 0, // 0%
        };
        return this.amount * (feeRates[this.method] || 0);
    }
    /**
     * Obtiene el monto neto después de comisiones
     */
    getNetAmount() {
        return this.amount - this.calculateFee();
    }
    /**
     * Serialización completa incluyendo campos específicos
     */
    toJSON() {
        return {
            ...super.toJSON(),
            registrationId: this.registrationId,
            amount: this.amount,
            method: this.method,
            status: this.status,
            transactionId: this.transactionId,
            description: this.description,
            paymentDate: this.paymentDate,
            registration: this.registration,
            fee: this.calculateFee(),
            netAmount: this.getNetAmount(),
        };
    }
    /**
     * Crea una instancia desde datos planos
     */
    static fromJSON(data) {
        return new Payment({
            ...data,
            paymentDate: data.paymentDate ? new Date(data.paymentDate) : undefined,
            createdAt: new Date(data.createdAt),
            updatedAt: new Date(data.updatedAt),
        });
    }
}
exports.Payment = Payment;
//# sourceMappingURL=payment.entity.js.map