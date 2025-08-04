"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentStatus = exports.PaymentMethod = exports.RegistrationStatus = exports.ShirtSize = exports.ShirtType = exports.RaceStatus = exports.RaceType = void 0;
/**
 * Tipos de carreras deportivas disponibles
 */
var RaceType;
(function (RaceType) {
    RaceType["MARATHON"] = "MARATHON";
    RaceType["HALF_MARATHON"] = "HALF_MARATHON";
    RaceType["TEN_K"] = "TEN_K";
    RaceType["FIVE_K"] = "FIVE_K";
    RaceType["TRAIL"] = "TRAIL";
    RaceType["TRIATHLON"] = "TRIATHLON";
    RaceType["CYCLING"] = "CYCLING";
})(RaceType || (exports.RaceType = RaceType = {}));
/**
 * Estados posibles de una carrera
 */
var RaceStatus;
(function (RaceStatus) {
    RaceStatus["PLANNED"] = "PLANNED";
    RaceStatus["OPEN_REGISTRATION"] = "OPEN_REGISTRATION";
    RaceStatus["CLOSED_REGISTRATION"] = "CLOSED_REGISTRATION";
    RaceStatus["IN_PROGRESS"] = "IN_PROGRESS";
    RaceStatus["COMPLETED"] = "COMPLETED";
    RaceStatus["CANCELLED"] = "CANCELLED";
})(RaceStatus || (exports.RaceStatus = RaceStatus = {}));
/**
 * Tipos de camisetas disponibles
 */
var ShirtType;
(function (ShirtType) {
    ShirtType["COTTON"] = "COTTON";
    ShirtType["POLYESTER"] = "POLYESTER";
    ShirtType["COTTON_BLEND"] = "COTTON_BLEND";
    ShirtType["DRI_FIT"] = "DRI_FIT";
})(ShirtType || (exports.ShirtType = ShirtType = {}));
/**
 * Tallas de camisetas disponibles
 */
var ShirtSize;
(function (ShirtSize) {
    ShirtSize["XS"] = "XS";
    ShirtSize["S"] = "S";
    ShirtSize["M"] = "M";
    ShirtSize["L"] = "L";
    ShirtSize["XL"] = "XL";
    ShirtSize["XXL"] = "XXL";
})(ShirtSize || (exports.ShirtSize = ShirtSize = {}));
/**
 * Estados de inscripción
 */
var RegistrationStatus;
(function (RegistrationStatus) {
    RegistrationStatus["PENDING"] = "PENDING";
    RegistrationStatus["CONFIRMED"] = "CONFIRMED";
    RegistrationStatus["CANCELLED"] = "CANCELLED";
    RegistrationStatus["COMPLETED"] = "COMPLETED";
})(RegistrationStatus || (exports.RegistrationStatus = RegistrationStatus = {}));
/**
 * Métodos de pago disponibles
 */
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["CREDIT_CARD"] = "CREDIT_CARD";
    PaymentMethod["DEBIT_CARD"] = "DEBIT_CARD";
    PaymentMethod["BANK_TRANSFER"] = "BANK_TRANSFER";
    PaymentMethod["PAYPAL"] = "PAYPAL";
    PaymentMethod["CASH"] = "CASH";
})(PaymentMethod || (exports.PaymentMethod = PaymentMethod = {}));
/**
 * Estados de pago
 */
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDING"] = "PENDING";
    PaymentStatus["PROCESSING"] = "PROCESSING";
    PaymentStatus["COMPLETED"] = "COMPLETED";
    PaymentStatus["FAILED"] = "FAILED";
    PaymentStatus["CANCELLED"] = "CANCELLED";
    PaymentStatus["REFUNDED"] = "REFUNDED";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
//# sourceMappingURL=index.js.map