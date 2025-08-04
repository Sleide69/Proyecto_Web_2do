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
exports.RegistrationSummaryDto = exports.CreatePaymentDto = exports.UpdateRegistrationDto = exports.CreateRegistrationDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const enums_1 = require("../enums");
const base_dto_1 = require("./base.dto");
/**
 * DTO para crear una inscripción con competidor embebido
 */
class CreateRegistrationDto {
}
exports.CreateRegistrationDto = CreateRegistrationDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateRegistrationDto.prototype, "raceId", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => base_dto_1.CreateCompetitorDto),
    __metadata("design:type", base_dto_1.CreateCompetitorDto)
], CreateRegistrationDto.prototype, "competitor", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CreateRegistrationDto.prototype, "notes", void 0);
/**
 * DTO para actualizar una inscripción
 */
class UpdateRegistrationDto {
}
exports.UpdateRegistrationDto = UpdateRegistrationDto;
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.RegistrationStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateRegistrationDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], UpdateRegistrationDto.prototype, "notes", void 0);
/**
 * DTO para crear un pago
 */
class CreatePaymentDto {
}
exports.CreatePaymentDto = CreatePaymentDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreatePaymentDto.prototype, "registrationId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Min)(0.01),
    (0, class_validator_1.Max)(10000),
    __metadata("design:type", Number)
], CreatePaymentDto.prototype, "amount", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.PaymentMethod),
    __metadata("design:type", String)
], CreatePaymentDto.prototype, "method", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreatePaymentDto.prototype, "transactionId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CreatePaymentDto.prototype, "description", void 0);
/**
 * DTO para el resumen completo de inscripción
 */
class RegistrationSummaryDto {
}
exports.RegistrationSummaryDto = RegistrationSummaryDto;
//# sourceMappingURL=registration.dto.js.map