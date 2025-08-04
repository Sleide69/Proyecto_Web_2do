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
exports.RegistrationSummaryDto = exports.UpdateRegistrationDto = exports.CreateRegistrationDto = void 0;
const class_validator_1 = require("class-validator");
const registration_entity_1 = require("../entities/registration.entity");
const competitor_dto_1 = require("./competitor.dto");
const payment_dto_1 = require("./payment.dto");
class CreateRegistrationDto {
}
exports.CreateRegistrationDto = CreateRegistrationDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRegistrationDto.prototype, "raceId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", competitor_dto_1.CreateCompetitorDto)
], CreateRegistrationDto.prototype, "competitor", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", payment_dto_1.CreatePaymentDto)
], CreateRegistrationDto.prototype, "payment", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRegistrationDto.prototype, "notes", void 0);
class UpdateRegistrationDto {
}
exports.UpdateRegistrationDto = UpdateRegistrationDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(registration_entity_1.RegistrationStatus),
    __metadata("design:type", String)
], UpdateRegistrationDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateRegistrationDto.prototype, "notes", void 0);
class RegistrationSummaryDto {
}
exports.RegistrationSummaryDto = RegistrationSummaryDto;
//# sourceMappingURL=registration.dto.js.map