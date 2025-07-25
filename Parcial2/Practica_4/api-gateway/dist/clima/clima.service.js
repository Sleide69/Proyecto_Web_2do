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
exports.ClimaService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
let ClimaService = class ClimaService {
    constructor(client) {
        this.client = client;
    }
    findAll() {
        return this.client.send({ cmd: 'find_all_clima' }, {});
    }
    findOne(id) {
        return this.client.send({ cmd: 'find_one_clima' }, { id });
    }
    create(createClimaDto) {
        return this.client.send({ cmd: 'create_clima' }, createClimaDto);
    }
    update(id, updateClimaDto) {
        return this.client.send({ cmd: 'update_clima' }, Object.assign({ id }, updateClimaDto));
    }
    remove(id) {
        return this.client.send({ cmd: 'remove_clima' }, { id });
    }
};
exports.ClimaService = ClimaService;
exports.ClimaService = ClimaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('CLIMA_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], ClimaService);
//# sourceMappingURL=clima.service.js.map