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
exports.CompetitorService = void 0;
const common_1 = require("@nestjs/common");
const json_persistence_service_1 = require("../persistence/json-persistence.service");
const competitor_entity_1 = require("../entities/competitor.entity");
const uuid_1 = require("uuid");
let CompetitorService = class CompetitorService {
    constructor(persistence) {
        this.persistence = persistence;
    }
    async createCompetitor(createCompetitorDto) {
        const existingCompetitor = this.persistence.findOneBy('competitors', {
            email: createCompetitorDto.email
        });
        if (existingCompetitor) {
            throw new common_1.ConflictException(`Ya existe un competidor con el email ${createCompetitorDto.email}`);
        }
        const competitor = new competitor_entity_1.Competitor(Object.assign(Object.assign({ id: (0, uuid_1.v4)() }, createCompetitorDto), { createdAt: new Date(), updatedAt: new Date() }));
        return this.persistence.create('competitors', competitor);
    }
    async findAllCompetitors() {
        return this.persistence.findAll('competitors');
    }
    async findCompetitorById(id) {
        const competitor = this.persistence.findById('competitors', id);
        if (!competitor) {
            throw new common_1.NotFoundException(`Competidor con ID ${id} no encontrado`);
        }
        return competitor;
    }
    async findCompetitorByEmail(email) {
        const competitor = this.persistence.findOneBy('competitors', { email });
        return competitor || null;
    }
    async updateCompetitor(id, updateCompetitorDto) {
        const existingCompetitor = await this.findCompetitorById(id);
        if (updateCompetitorDto.email && updateCompetitorDto.email !== existingCompetitor.email) {
            const emailInUse = this.persistence.findOneBy('competitors', {
                email: updateCompetitorDto.email
            });
            if (emailInUse && emailInUse.id !== id) {
                throw new common_1.ConflictException(`El email ${updateCompetitorDto.email} ya está en uso por otro competidor`);
            }
        }
        const updatedCompetitor = this.persistence.update('competitors', id, updateCompetitorDto);
        if (!updatedCompetitor) {
            throw new common_1.NotFoundException(`Competidor con ID ${id} no encontrado`);
        }
        return updatedCompetitor;
    }
    async deleteCompetitor(id) {
        const registrations = this.persistence.findBy('registrations', { competitorId: id });
        if (registrations.length > 0) {
            throw new common_1.ConflictException('No se puede eliminar un competidor que tiene registros asociados');
        }
        const deleted = this.persistence.delete('competitors', id);
        if (!deleted) {
            throw new common_1.NotFoundException(`Competidor con ID ${id} no encontrado`);
        }
    }
    async searchCompetitors(searchTerm) {
        const allCompetitors = this.persistence.findAll('competitors');
        const term = searchTerm.toLowerCase();
        return allCompetitors.filter(competitor => competitor.firstName.toLowerCase().includes(term) ||
            competitor.lastName.toLowerCase().includes(term) ||
            competitor.email.toLowerCase().includes(term) ||
            competitor.phone.includes(term));
    }
    async getCompetitorRegistrations(competitorId) {
        await this.findCompetitorById(competitorId);
        return this.persistence.findBy('registrations', { competitorId });
    }
};
exports.CompetitorService = CompetitorService;
exports.CompetitorService = CompetitorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [json_persistence_service_1.JsonPersistenceService])
], CompetitorService);
//# sourceMappingURL=competitor.service.js.map