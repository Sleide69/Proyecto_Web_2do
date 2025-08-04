"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Registration = exports.RegistrationStatus = void 0;
var RegistrationStatus;
(function (RegistrationStatus) {
    RegistrationStatus["PENDING"] = "PENDING";
    RegistrationStatus["CONFIRMED"] = "CONFIRMED";
    RegistrationStatus["CANCELLED"] = "CANCELLED";
    RegistrationStatus["COMPLETED"] = "COMPLETED";
})(RegistrationStatus || (exports.RegistrationStatus = RegistrationStatus = {}));
class Registration {
    constructor(data = {}) {
        this.id = data.id || '';
        this.raceId = data.raceId || '';
        this.competitorId = data.competitorId || '';
        this.paymentId = data.paymentId;
        this.status = data.status || RegistrationStatus.PENDING;
        this.registrationDate = data.registrationDate || new Date();
        this.confirmationCode = data.confirmationCode;
        this.notes = data.notes;
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt || new Date();
        this.race = data.race;
        this.competitor = data.competitor;
        this.payment = data.payment;
    }
    generateConfirmationCode() {
        const code = `REG-${this.raceId.slice(-4).toUpperCase()}-${this.id.slice(-6).toUpperCase()}`;
        this.confirmationCode = code;
        return code;
    }
}
exports.Registration = Registration;
//# sourceMappingURL=registration.entity.js.map