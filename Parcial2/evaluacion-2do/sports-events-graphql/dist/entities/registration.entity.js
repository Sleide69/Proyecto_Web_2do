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
exports.Registration = exports.RegistrationStatus = void 0;
const graphql_1 = require("@nestjs/graphql");
const race_entity_1 = require("./race.entity");
const competitor_entity_1 = require("./competitor.entity");
const payment_entity_1 = require("./payment.entity");
var RegistrationStatus;
(function (RegistrationStatus) {
    RegistrationStatus["PENDING"] = "PENDING";
    RegistrationStatus["CONFIRMED"] = "CONFIRMED";
    RegistrationStatus["CANCELLED"] = "CANCELLED";
    RegistrationStatus["COMPLETED"] = "COMPLETED";
})(RegistrationStatus || (exports.RegistrationStatus = RegistrationStatus = {}));
(0, graphql_1.registerEnumType)(RegistrationStatus, {
    name: 'RegistrationStatus',
    description: 'Estados de la inscripción'
});
let Registration = class Registration {
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
};
exports.Registration = Registration;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], Registration.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Registration.prototype, "raceId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Registration.prototype, "competitorId", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Registration.prototype, "paymentId", void 0);
__decorate([
    (0, graphql_1.Field)(() => RegistrationStatus),
    __metadata("design:type", String)
], Registration.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Registration.prototype, "registrationDate", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Registration.prototype, "confirmationCode", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Registration.prototype, "notes", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Registration.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Registration.prototype, "updatedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => race_entity_1.Race, { nullable: true }),
    __metadata("design:type", race_entity_1.Race)
], Registration.prototype, "race", void 0);
__decorate([
    (0, graphql_1.Field)(() => competitor_entity_1.Competitor, { nullable: true }),
    __metadata("design:type", competitor_entity_1.Competitor)
], Registration.prototype, "competitor", void 0);
__decorate([
    (0, graphql_1.Field)(() => payment_entity_1.Payment, { nullable: true }),
    __metadata("design:type", payment_entity_1.Payment)
], Registration.prototype, "payment", void 0);
exports.Registration = Registration = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [Object])
], Registration);
//# sourceMappingURL=registration.entity.js.map