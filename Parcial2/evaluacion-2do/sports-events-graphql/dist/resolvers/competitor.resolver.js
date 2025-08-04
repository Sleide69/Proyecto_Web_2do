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
exports.CompetitorResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const competitor_service_1 = require("../services/competitor.service");
const competitor_entity_1 = require("../entities/competitor.entity");
const competitor_input_1 = require("../inputs/competitor.input");
let CompetitorResolver = class CompetitorResolver {
    constructor(competitorService) {
        this.competitorService = competitorService;
    }
    async createCompetitor(input) {
        return await this.competitorService.createCompetitor(input);
    }
    async competitors() {
        return await this.competitorService.findAllCompetitors();
    }
    async competitor(id) {
        return await this.competitorService.findCompetitorById(id);
    }
    async updateCompetitor(id, input) {
        return await this.competitorService.updateCompetitor(id, input);
    }
    async deleteCompetitor(id) {
        return await this.competitorService.deleteCompetitor(id);
    }
};
exports.CompetitorResolver = CompetitorResolver;
__decorate([
    (0, graphql_1.Mutation)(() => competitor_entity_1.Competitor, { description: 'Crear un nuevo competidor' }),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [competitor_input_1.CreateCompetitorInput]),
    __metadata("design:returntype", Promise)
], CompetitorResolver.prototype, "createCompetitor", null);
__decorate([
    (0, graphql_1.Query)(() => [competitor_entity_1.Competitor], { description: 'Obtener todos los competidores' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CompetitorResolver.prototype, "competitors", null);
__decorate([
    (0, graphql_1.Query)(() => competitor_entity_1.Competitor, { description: 'Obtener competidor por ID' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CompetitorResolver.prototype, "competitor", null);
__decorate([
    (0, graphql_1.Mutation)(() => competitor_entity_1.Competitor, { description: 'Actualizar un competidor' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, competitor_input_1.UpdateCompetitorInput]),
    __metadata("design:returntype", Promise)
], CompetitorResolver.prototype, "updateCompetitor", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, { description: 'Eliminar un competidor' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CompetitorResolver.prototype, "deleteCompetitor", null);
exports.CompetitorResolver = CompetitorResolver = __decorate([
    (0, graphql_1.Resolver)(() => competitor_entity_1.Competitor),
    __metadata("design:paramtypes", [competitor_service_1.CompetitorService])
], CompetitorResolver);
//# sourceMappingURL=competitor.resolver.js.map