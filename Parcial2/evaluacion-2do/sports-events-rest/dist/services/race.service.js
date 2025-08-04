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
exports.RaceService = void 0;
const common_1 = require("@nestjs/common");
const json_persistence_service_1 = require("../persistence/json-persistence.service");
const race_entity_1 = require("../entities/race.entity");
const uuid_1 = require("uuid");
let RaceService = class RaceService {
    constructor(persistence) {
        this.persistence = persistence;
    }
    async createRace(createRaceDto) {
        if (createRaceDto.registrationStartDate >= createRaceDto.registrationEndDate) {
            throw new common_1.BadRequestException('La fecha de inicio de registro debe ser anterior a la fecha de fin');
        }
        if (createRaceDto.registrationEndDate >= createRaceDto.eventDate) {
            throw new common_1.BadRequestException('La fecha de fin de registro debe ser anterior a la fecha del evento');
        }
        const race = new race_entity_1.Race(Object.assign(Object.assign({ id: (0, uuid_1.v4)() }, createRaceDto), { status: createRaceDto.status || race_entity_1.RaceStatus.PLANNED, createdAt: new Date(), updatedAt: new Date() }));
        return this.persistence.create('races', race);
    }
    async findAllRaces() {
        return this.persistence.findAll('races');
    }
    async findRaceById(id) {
        const race = this.persistence.findById('races', id);
        if (!race) {
            throw new common_1.NotFoundException(`Carrera con ID ${id} no encontrada`);
        }
        return race;
    }
    async updateRace(id, updateRaceDto) {
        const existingRace = await this.findRaceById(id);
        if (updateRaceDto.registrationStartDate && updateRaceDto.registrationEndDate) {
            if (updateRaceDto.registrationStartDate >= updateRaceDto.registrationEndDate) {
                throw new common_1.BadRequestException('La fecha de inicio de registro debe ser anterior a la fecha de fin');
            }
        }
        const updatedRace = this.persistence.update('races', id, updateRaceDto);
        if (!updatedRace) {
            throw new common_1.NotFoundException(`Carrera con ID ${id} no encontrada`);
        }
        return updatedRace;
    }
    async deleteRace(id) {
        const registrations = this.persistence.findBy('registrations', { raceId: id });
        if (registrations.length > 0) {
            throw new common_1.BadRequestException('No se puede eliminar una carrera que tiene registros asociados');
        }
        const deleted = this.persistence.delete('races', id);
        if (!deleted) {
            throw new common_1.NotFoundException(`Carrera con ID ${id} no encontrada`);
        }
    }
    async updateRaceStatus(id, status) {
        return this.updateRace(id, { status });
    }
    async getRacesByStatus(status) {
        return this.persistence.findBy('races', { status });
    }
    async getAvailableRaces() {
        const now = new Date();
        const allRaces = this.persistence.findAll('races');
        return allRaces.filter(race => {
            const registrationStart = new Date(race.registrationStartDate);
            const registrationEnd = new Date(race.registrationEndDate);
            return race.status === race_entity_1.RaceStatus.OPEN_REGISTRATION &&
                now >= registrationStart &&
                now <= registrationEnd;
        });
    }
    async getRaceStatistics(id) {
        const race = await this.findRaceById(id);
        const registrations = this.persistence.findBy('registrations', { raceId: id });
        return {
            raceId: id,
            raceName: race.name,
            totalRegistrations: registrations.length,
            availableSpots: race.maxParticipants - registrations.length,
            registrationPercentage: (registrations.length / race.maxParticipants) * 100
        };
    }
};
exports.RaceService = RaceService;
exports.RaceService = RaceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [json_persistence_service_1.JsonPersistenceService])
], RaceService);
//# sourceMappingURL=race.service.js.map