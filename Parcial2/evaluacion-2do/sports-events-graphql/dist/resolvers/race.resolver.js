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
exports.RaceResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const race_service_1 = require("../services/race.service");
const race_entity_1 = require("../entities/race.entity");
const race_input_1 = require("../inputs/race.input");
let RaceResolver = class RaceResolver {
    constructor(raceService) {
        this.raceService = raceService;
    }
    async createRace(input) {
        return await this.raceService.createRace(input);
    }
    async races() {
        return await this.raceService.findAllRaces();
    }
    async availableRaces() {
        return await this.raceService.getAvailableRaces();
    }
    async racesByStatus(status) {
        return await this.raceService.getRacesByStatus(status);
    }
    async race(id) {
        return await this.raceService.findRaceById(id);
    }
    async updateRace(id, input) {
        return await this.raceService.updateRace(id, input);
    }
    async updateRaceStatus(id, status) {
        return await this.raceService.updateRaceStatus(id, status);
    }
    async deleteRace(id) {
        return await this.raceService.deleteRace(id);
    }
};
exports.RaceResolver = RaceResolver;
__decorate([
    (0, graphql_1.Mutation)(() => race_entity_1.Race, { description: 'Crear una nueva carrera' }),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [race_input_1.CreateRaceInput]),
    __metadata("design:returntype", Promise)
], RaceResolver.prototype, "createRace", null);
__decorate([
    (0, graphql_1.Query)(() => [race_entity_1.Race], { description: 'Obtener todas las carreras' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RaceResolver.prototype, "races", null);
__decorate([
    (0, graphql_1.Query)(() => [race_entity_1.Race], { description: 'Obtener carreras disponibles para registro' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RaceResolver.prototype, "availableRaces", null);
__decorate([
    (0, graphql_1.Query)(() => [race_entity_1.Race], { description: 'Obtener carreras por estado' }),
    __param(0, (0, graphql_1.Args)('status', { type: () => race_entity_1.RaceStatus })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RaceResolver.prototype, "racesByStatus", null);
__decorate([
    (0, graphql_1.Query)(() => race_entity_1.Race, { description: 'Obtener carrera por ID' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RaceResolver.prototype, "race", null);
__decorate([
    (0, graphql_1.Mutation)(() => race_entity_1.Race, { description: 'Actualizar una carrera' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, race_input_1.UpdateRaceInput]),
    __metadata("design:returntype", Promise)
], RaceResolver.prototype, "updateRace", null);
__decorate([
    (0, graphql_1.Mutation)(() => race_entity_1.Race, { description: 'Actualizar el estado de una carrera' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __param(1, (0, graphql_1.Args)('status', { type: () => race_entity_1.RaceStatus })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RaceResolver.prototype, "updateRaceStatus", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, { description: 'Eliminar una carrera' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RaceResolver.prototype, "deleteRace", null);
exports.RaceResolver = RaceResolver = __decorate([
    (0, graphql_1.Resolver)(() => race_entity_1.Race),
    __metadata("design:paramtypes", [race_service_1.RaceService])
], RaceResolver);
//# sourceMappingURL=race.resolver.js.map