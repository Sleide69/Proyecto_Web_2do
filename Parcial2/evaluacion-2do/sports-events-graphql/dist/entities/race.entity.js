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
exports.Race = exports.RaceStatus = exports.RaceType = void 0;
const graphql_1 = require("@nestjs/graphql");
var RaceType;
(function (RaceType) {
    RaceType["MARATHON"] = "MARATHON";
    RaceType["HALF_MARATHON"] = "HALF_MARATHON";
    RaceType["TEN_K"] = "10K";
    RaceType["FIVE_K"] = "5K";
    RaceType["TRAIL"] = "TRAIL";
    RaceType["TRIATHLON"] = "TRIATHLON";
    RaceType["CYCLING"] = "CYCLING";
})(RaceType || (exports.RaceType = RaceType = {}));
var RaceStatus;
(function (RaceStatus) {
    RaceStatus["PLANNED"] = "PLANNED";
    RaceStatus["OPEN_REGISTRATION"] = "OPEN_REGISTRATION";
    RaceStatus["CLOSED_REGISTRATION"] = "CLOSED_REGISTRATION";
    RaceStatus["IN_PROGRESS"] = "IN_PROGRESS";
    RaceStatus["COMPLETED"] = "COMPLETED";
    RaceStatus["CANCELLED"] = "CANCELLED";
})(RaceStatus || (exports.RaceStatus = RaceStatus = {}));
(0, graphql_1.registerEnumType)(RaceType, {
    name: 'RaceType',
    description: 'Tipos de carrera disponibles'
});
(0, graphql_1.registerEnumType)(RaceStatus, {
    name: 'RaceStatus',
    description: 'Estados de la carrera'
});
let Race = class Race {
    constructor(data = {}) {
        this.id = data.id || '';
        this.name = data.name || '';
        this.description = data.description || '';
        this.type = data.type || RaceType.FIVE_K;
        this.eventDate = data.eventDate || new Date();
        this.registrationStartDate = data.registrationStartDate || new Date();
        this.registrationEndDate = data.registrationEndDate || new Date();
        this.location = data.location || '';
        this.distance = data.distance || '';
        this.maxParticipants = data.maxParticipants || 100;
        this.registrationFee = data.registrationFee || 0;
        this.status = data.status || RaceStatus.PLANNED;
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt || new Date();
    }
};
exports.Race = Race;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], Race.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Race.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Race.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(() => RaceType),
    __metadata("design:type", String)
], Race.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Race.prototype, "eventDate", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Race.prototype, "registrationStartDate", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Race.prototype, "registrationEndDate", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Race.prototype, "location", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Race.prototype, "distance", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Race.prototype, "maxParticipants", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Race.prototype, "registrationFee", void 0);
__decorate([
    (0, graphql_1.Field)(() => RaceStatus),
    __metadata("design:type", String)
], Race.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Race.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Race.prototype, "updatedAt", void 0);
exports.Race = Race = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [Object])
], Race);
//# sourceMappingURL=race.entity.js.map