"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Race = exports.RaceStatus = exports.RaceType = void 0;
var RaceType;
(function (RaceType) {
    RaceType["MARATHON"] = "MARATHON";
    RaceType["HALF_MARATHON"] = "HALF_MARATHON";
    RaceType["TEN_K"] = "10K";
    RaceType["FIVE_K"] = "5K";
    RaceType["TRAIL"] = "TRAIL";
    RaceType["TRIATHLON"] = "TRIATHLON";
    RaceType["CYCLING"] = "CYCLING";
})(RaceType || (exports.RaceType = RaceType = {}));
var RaceStatus;
(function (RaceStatus) {
    RaceStatus["PLANNED"] = "PLANNED";
    RaceStatus["OPEN_REGISTRATION"] = "OPEN_REGISTRATION";
    RaceStatus["CLOSED_REGISTRATION"] = "CLOSED_REGISTRATION";
    RaceStatus["IN_PROGRESS"] = "IN_PROGRESS";
    RaceStatus["COMPLETED"] = "COMPLETED";
    RaceStatus["CANCELLED"] = "CANCELLED";
})(RaceStatus || (exports.RaceStatus = RaceStatus = {}));
class Race {
    constructor(data = {}) {
        this.id = data.id || '';
        this.name = data.name || '';
        this.description = data.description || '';
        this.type = data.type || RaceType.FIVE_K;
        this.eventDate = data.eventDate || new Date();
        this.registrationStartDate = data.registrationStartDate || new Date();
        this.registrationEndDate = data.registrationEndDate || new Date();
        this.location = data.location || '';
        this.distance = data.distance || '';
        this.maxParticipants = data.maxParticipants || 100;
        this.registrationFee = data.registrationFee || 0;
        this.status = data.status || RaceStatus.PLANNED;
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt || new Date();
    }
}
exports.Race = Race;
//# sourceMappingURL=race.entity.js.map