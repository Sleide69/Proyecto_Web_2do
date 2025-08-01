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
exports.ExportacionService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
let ExportacionService = class ExportacionService {
    constructor(client) {
        this.client = client;
    }
    findAll() {
        return this.client.send({ cmd: 'find_all_exportaciones' }, {});
    }
    findOne(id) {
        return this.client.send({ cmd: 'find_one_exportacion' }, { id });
    }
    create(createExportacionDto) {
        return this.client.send({ cmd: 'create_exportacion' }, createExportacionDto);
    }
    update(id, updateExportacionDto) {
        return this.client.send({ cmd: 'update_exportacion' }, Object.assign({ id }, updateExportacionDto));
    }
    remove(id) {
        return this.client.send({ cmd: 'remove_exportacion' }, { id });
    }
};
exports.ExportacionService = ExportacionService;
exports.ExportacionService = ExportacionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('EXPORTACION_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], ExportacionService);
//# sourceMappingURL=exportacion.service.js.map