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
exports.RaceController = void 0;
const common_1 = require("@nestjs/common");
const race_service_1 = require("../services/race.service");
const race_dto_1 = require("../dto/race.dto");
const race_entity_1 = require("../entities/race.entity");
let RaceController = class RaceController {
    constructor(raceService) {
        this.raceService = raceService;
    }
    async create(createRaceDto) {
        return await this.raceService.createRace(createRaceDto);
    }
    async findAll() {
        return await this.raceService.findAllRaces();
    }
    async findAvailable() {
        return await this.raceService.getAvailableRaces();
    }
    async findByStatus(status) {
        return await this.raceService.getRacesByStatus(status);
    }
    async findOne(id) {
        return await this.raceService.findRaceById(id);
    }
    async getStatistics(id) {
        return await this.raceService.getRaceStatistics(id);
    }
    async update(id, updateRaceDto) {
        return await this.raceService.updateRace(id, updateRaceDto);
    }
    async updateStatus(id, status) {
        return await this.raceService.updateRaceStatus(id, status);
    }
    async remove(id) {
        await this.raceService.deleteRace(id);
    }
};
exports.RaceController = RaceController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [race_dto_1.CreateRaceDto]),
    __metadata("design:returntype", Promise)
], RaceController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RaceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('available'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RaceController.prototype, "findAvailable", null);
__decorate([
    (0, common_1.Get)('status/:status'),
    __param(0, (0, common_1.Param)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RaceController.prototype, "findByStatus", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RaceController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/statistics'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RaceController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, race_dto_1.UpdateRaceDto]),
    __metadata("design:returntype", Promise)
], RaceController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/status/:status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RaceController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RaceController.prototype, "remove", null);
exports.RaceController = RaceController = __decorate([
    (0, common_1.Controller)('races'),
    __metadata("design:paramtypes", [race_service_1.RaceService])
], RaceController);
//# sourceMappingURL=race.controller.js.map