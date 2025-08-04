"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainEventType = void 0;
/**
 * Tipos de eventos del dominio
 */
var DomainEventType;
(function (DomainEventType) {
    DomainEventType["RACE_CREATED"] = "race.created";
    DomainEventType["RACE_UPDATED"] = "race.updated";
    DomainEventType["RACE_DELETED"] = "race.deleted";
    DomainEventType["RACE_STATUS_CHANGED"] = "race.status.changed";
    DomainEventType["COMPETITOR_CREATED"] = "competitor.created";
    DomainEventType["COMPETITOR_UPDATED"] = "competitor.updated";
    DomainEventType["COMPETITOR_DELETED"] = "competitor.deleted";
    DomainEventType["REGISTRATION_CREATED"] = "registration.created";
    DomainEventType["REGISTRATION_CONFIRMED"] = "registration.confirmed";
    DomainEventType["REGISTRATION_CANCELLED"] = "registration.cancelled";
    DomainEventType["REGISTRATION_COMPLETED"] = "registration.completed";
    DomainEventType["PAYMENT_CREATED"] = "payment.created";
    DomainEventType["PAYMENT_PROCESSING"] = "payment.processing";
    DomainEventType["PAYMENT_COMPLETED"] = "payment.completed";
    DomainEventType["PAYMENT_FAILED"] = "payment.failed";
    DomainEventType["PAYMENT_CANCELLED"] = "payment.cancelled";
    DomainEventType["PAYMENT_REFUNDED"] = "payment.refunded";
})(DomainEventType || (exports.DomainEventType = DomainEventType = {}));
//# sourceMappingURL=services.interface.js.map