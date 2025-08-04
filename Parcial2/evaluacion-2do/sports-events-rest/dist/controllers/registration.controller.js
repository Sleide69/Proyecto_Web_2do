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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrationController = void 0;
const common_1 = require("@nestjs/common");
const registration_service_1 = require("../services/registration.service");
const registration_dto_1 = require("../dto/registration.dto");
let RegistrationController = class RegistrationController {
    constructor(registrationService) {
        this.registrationService = registrationService;
    }
    async create(createRegistrationDto) {
        return await this.registrationService.createRegistration(createRegistrationDto);
    }
    async findAll() {
        return await this.registrationService.findAllRegistrations();
    }
    async findOne(id) {
        return await this.registrationService.findRegistrationById(id);
    }
    async getSummary(id) {
        return await this.registrationService.getRegistrationSummary(id);
    }
    async findByRace(raceId) {
        return await this.registrationService.getRegistrationsByRace(raceId);
    }
    async findByCompetitor(competitorId) {
        return await this.registrationService.getRegistrationsByCompetitor(competitorId);
    }
    async update(id, updateRegistrationDto) {
        return await this.registrationService.updateRegistration(id, updateRegistrationDto);
    }
    async confirm(id) {
        return await this.registrationService.confirmRegistration(id);
    }
    async cancel(id) {
        return await this.registrationService.cancelRegistration(id);
    }
};
exports.RegistrationController = RegistrationController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [registration_dto_1.CreateRegistrationDto]),
    __metadata("design:returntype", Promise)
], RegistrationController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RegistrationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RegistrationController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/summary'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RegistrationController.prototype, "getSummary", null);
__decorate([
    (0, common_1.Get)('race/:raceId'),
    __param(0, (0, common_1.Param)('raceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RegistrationController.prototype, "findByRace", null);
__decorate([
    (0, common_1.Get)('competitor/:competitorId'),
    __param(0, (0, common_1.Param)('competitorId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RegistrationController.prototype, "findByCompetitor", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, registration_dto_1.UpdateRegistrationDto]),
    __metadata("design:returntype", Promise)
], RegistrationController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/confirm'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RegistrationController.prototype, "confirm", null);
__decorate([
    (0, common_1.Patch)(':id/cancel'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RegistrationController.prototype, "cancel", null);
exports.RegistrationController = RegistrationController = __decorate([
    (0, common_1.Controller)('registrations'),
    __metadata("design:paramtypes", [registration_service_1.RegistrationService])
], RegistrationController);
//# sourceMappingURL=registration.controller.js.map