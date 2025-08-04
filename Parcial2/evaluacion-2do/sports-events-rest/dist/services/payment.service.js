"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const json_persistence_service_1 = require("../persistence/json-persistence.service");
const payment_entity_1 = require("../entities/payment.entity");
const uuid_1 = require("uuid");
let PaymentService = class PaymentService {
    constructor(persistence) {
        this.persistence = persistence;
    }
    async createPayment(createPaymentDto) {
        const payment = new payment_entity_1.Payment(Object.assign(Object.assign({ id: (0, uuid_1.v4)() }, createPaymentDto), { status: payment_entity_1.PaymentStatus.PENDING, createdAt: new Date(), updatedAt: new Date() }));
        return this.persistence.create('payments', payment);
    }
    async findAllPayments() {
        return this.persistence.findAll('payments');
    }
    async findPaymentById(id) {
        const payment = this.persistence.findById('payments', id);
        if (!payment) {
            throw new common_1.NotFoundException(`Pago con ID ${id} no encontrado`);
        }
        return payment;
    }
    async updatePayment(id, updatePaymentDto) {
        await this.findPaymentById(id);
        const updatedPayment = this.persistence.update('payments', id, updatePaymentDto);
        if (!updatedPayment) {
            throw new common_1.NotFoundException(`Pago con ID ${id} no encontrado`);
        }
        return updatedPayment;
    }
    async processPayment(id) {
        const payment = await this.findPaymentById(id);
        if (payment.status !== payment_entity_1.PaymentStatus.PENDING) {
            throw new common_1.BadRequestException(`El pago no puede ser procesado. Estado actual: ${payment.status}`);
        }
        const updates = {
            status: payment_entity_1.PaymentStatus.PROCESSING,
            paymentDate: new Date()
        };
        return this.updatePayment(id, updates);
    }
    async completePayment(id, transactionId) {
        const payment = await this.findPaymentById(id);
        if (payment.status !== payment_entity_1.PaymentStatus.PROCESSING) {
            throw new common_1.BadRequestException(`El pago no puede ser completado. Estado actual: ${payment.status}`);
        }
        const updates = {
            status: payment_entity_1.PaymentStatus.COMPLETED,
            transactionId: transactionId || `TXN-${Date.now()}`,
            paymentDate: new Date()
        };
        return this.updatePayment(id, updates);
    }
    async cancelPayment(id) {
        const payment = await this.findPaymentById(id);
        if (payment.status === payment_entity_1.PaymentStatus.COMPLETED) {
            throw new common_1.BadRequestException('No se puede cancelar un pago completado');
        }
        return this.updatePayment(id, { status: payment_entity_1.PaymentStatus.CANCELLED });
    }
    async refundPayment(id) {
        const payment = await this.findPaymentById(id);
        if (payment.status !== payment_entity_1.PaymentStatus.COMPLETED) {
            throw new common_1.BadRequestException('Solo se pueden reembolsar pagos completados');
        }
        return this.updatePayment(id, { status: payment_entity_1.PaymentStatus.REFUNDED });
    }
    async getPaymentsByStatus(status) {
        return this.persistence.findBy('payments', { status });
    }
    async getPaymentStatistics() {
        const allPayments = this.persistence.findAll('payments');
        const stats = {
            total: allPayments.length,
            pending: 0,
            processing: 0,
            completed: 0,
            failed: 0,
            cancelled: 0,
            refunded: 0,
            totalAmount: 0,
            completedAmount: 0
        };
        allPayments.forEach(payment => {
            stats[payment.status.toLowerCase()]++;
            stats.totalAmount += payment.amount;
            if (payment.status === payment_entity_1.PaymentStatus.COMPLETED) {
                stats.completedAmount += payment.amount;
            }
        });
        return stats;
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [json_persistence_service_1.JsonPersistenceService])
], PaymentService);
//# sourceMappingURL=payment.service.js.map