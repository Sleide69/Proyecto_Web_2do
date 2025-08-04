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
exports.UpdateCompetitorDto = exports.CreateCompetitorDto = exports.UpdateRaceDto = exports.CreateRaceDto = void 0;
const class_validator_1 = require("class-validator");
const enums_1 = require("../enums");
/**
 * DTO para crear una nueva carrera
 */
class CreateRaceDto {
    constructor() {
        this.status = enums_1.RaceStatus.PLANNED;
    }
}
exports.CreateRaceDto = CreateRaceDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateRaceDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(10),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CreateRaceDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.RaceType),
    __metadata("design:type", String)
], CreateRaceDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateRaceDto.prototype, "eventDate", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateRaceDto.prototype, "registrationStartDate", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateRaceDto.prototype, "registrationEndDate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreateRaceDto.prototype, "location", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateRaceDto.prototype, "distance", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(10000),
    __metadata("design:type", Number)
], CreateRaceDto.prototype, "maxParticipants", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(10000),
    __metadata("design:type", Number)
], CreateRaceDto.prototype, "registrationFee", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.RaceStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateRaceDto.prototype, "status", void 0);
/**
 * DTO para actualizar una carrera
 */
class UpdateRaceDto {
}
exports.UpdateRaceDto = UpdateRaceDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], UpdateRaceDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(10),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], UpdateRaceDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.RaceType),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateRaceDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateRaceDto.prototype, "eventDate", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateRaceDto.prototype, "registrationStartDate", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateRaceDto.prototype, "registrationEndDate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], UpdateRaceDto.prototype, "location", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], UpdateRaceDto.prototype, "distance", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(10000),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateRaceDto.prototype, "maxParticipants", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(10000),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateRaceDto.prototype, "registrationFee", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.RaceStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateRaceDto.prototype, "status", void 0);
/**
 * DTO para crear un competidor
 */
class CreateCompetitorDto {
}
exports.CreateCompetitorDto = CreateCompetitorDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateCompetitorDto.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateCompetitorDto.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateCompetitorDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCompetitorDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.ShirtType),
    __metadata("design:type", String)
], CreateCompetitorDto.prototype, "shirtType", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.ShirtSize),
    __metadata("design:type", String)
], CreateCompetitorDto.prototype, "shirtSize", void 0);
/**
 * DTO para actualizar un competidor
 */
class UpdateCompetitorDto {
}
exports.UpdateCompetitorDto = UpdateCompetitorDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], UpdateCompetitorDto.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], UpdateCompetitorDto.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCompetitorDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCompetitorDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.ShirtType),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCompetitorDto.prototype, "shirtType", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.ShirtSize),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCompetitorDto.prototype, "shirtSize", void 0);
//# sourceMappingURL=base.dto.js.map