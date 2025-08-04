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
exports.RegistrationResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const registration_service_1 = require("../services/registration.service");
const registration_entity_1 = require("../entities/registration.entity");
const registration_input_1 = require("../inputs/registration.input");
let RegistrationResolver = class RegistrationResolver {
    constructor(registrationService) {
        this.registrationService = registrationService;
    }
    async createRegistration(input) {
        return await this.registrationService.createRegistration(input);
    }
    async registrations() {
        return await this.registrationService.findAllRegistrations();
    }
    async registration(id) {
        return await this.registrationService.findRegistrationById(id);
    }
    async registrationsByRace(raceId) {
        return await this.registrationService.getRegistrationsByRace(raceId);
    }
    async updateRegistration(id, input) {
        return await this.registrationService.updateRegistration(id, input);
    }
    async confirmRegistration(id) {
        return await this.registrationService.confirmRegistration(id);
    }
    async cancelRegistration(id) {
        return await this.registrationService.cancelRegistration(id);
    }
};
exports.RegistrationResolver = RegistrationResolver;
__decorate([
    (0, graphql_1.Mutation)(() => registration_entity_1.Registration, { description: 'Crear una nueva inscripción' }),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [registration_input_1.CreateRegistrationInput]),
    __metadata("design:returntype", Promise)
], RegistrationResolver.prototype, "createRegistration", null);
__decorate([
    (0, graphql_1.Query)(() => [registration_entity_1.Registration], { description: 'Obtener todas las inscripciones' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RegistrationResolver.prototype, "registrations", null);
__decorate([
    (0, graphql_1.Query)(() => registration_entity_1.Registration, { description: 'Obtener inscripción por ID' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RegistrationResolver.prototype, "registration", null);
__decorate([
    (0, graphql_1.Query)(() => [registration_entity_1.Registration], { description: 'Obtener inscripciones por carrera' }),
    __param(0, (0, graphql_1.Args)('raceId', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RegistrationResolver.prototype, "registrationsByRace", null);
__decorate([
    (0, graphql_1.Mutation)(() => registration_entity_1.Registration, { description: 'Actualizar una inscripción' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, registration_input_1.UpdateRegistrationInput]),
    __metadata("design:returntype", Promise)
], RegistrationResolver.prototype, "updateRegistration", null);
__decorate([
    (0, graphql_1.Mutation)(() => registration_entity_1.Registration, { description: 'Confirmar una inscripción' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RegistrationResolver.prototype, "confirmRegistration", null);
__decorate([
    (0, graphql_1.Mutation)(() => registration_entity_1.Registration, { description: 'Cancelar una inscripción' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RegistrationResolver.prototype, "cancelRegistration", null);
exports.RegistrationResolver = RegistrationResolver = __decorate([
    (0, graphql_1.Resolver)(() => registration_entity_1.Registration),
    __metadata("design:paramtypes", [registration_service_1.RegistrationService])
], RegistrationResolver);
//# sourceMappingURL=registration.resolver.js.map