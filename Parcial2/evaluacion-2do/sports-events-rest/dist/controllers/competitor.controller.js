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
exports.CompetitorController = void 0;
const common_1 = require("@nestjs/common");
const competitor_service_1 = require("../services/competitor.service");
const competitor_dto_1 = require("../dto/competitor.dto");
let CompetitorController = class CompetitorController {
    constructor(competitorService) {
        this.competitorService = competitorService;
    }
    async create(createCompetitorDto) {
        return await this.competitorService.createCompetitor(createCompetitorDto);
    }
    async findAll(search) {
        if (search) {
            return await this.competitorService.searchCompetitors(search);
        }
        return await this.competitorService.findAllCompetitors();
    }
    async findOne(id) {
        return await this.competitorService.findCompetitorById(id);
    }
    async getRegistrations(id) {
        return await this.competitorService.getCompetitorRegistrations(id);
    }
    async update(id, updateCompetitorDto) {
        return await this.competitorService.updateCompetitor(id, updateCompetitorDto);
    }
    async remove(id) {
        await this.competitorService.deleteCompetitor(id);
    }
};
exports.CompetitorController = CompetitorController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [competitor_dto_1.CreateCompetitorDto]),
    __metadata("design:returntype", Promise)
], CompetitorController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CompetitorController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CompetitorController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/registrations'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CompetitorController.prototype, "getRegistrations", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, competitor_dto_1.UpdateCompetitorDto]),
    __metadata("design:returntype", Promise)
], CompetitorController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CompetitorController.prototype, "remove", null);
exports.CompetitorController = CompetitorController = __decorate([
    (0, common_1.Controller)('competitors'),
    __metadata("design:paramtypes", [competitor_service_1.CompetitorService])
], CompetitorController);
//# sourceMappingURL=competitor.controller.js.map