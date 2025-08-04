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
exports.Competitor = exports.ShirtSize = exports.ShirtType = void 0;
const graphql_1 = require("@nestjs/graphql");
var ShirtType;
(function (ShirtType) {
    ShirtType["COTTON"] = "COTTON";
    ShirtType["POLYESTER"] = "POLYESTER";
    ShirtType["COTTON_BLEND"] = "COTTON_BLEND";
    ShirtType["DRI_FIT"] = "DRI_FIT";
})(ShirtType || (exports.ShirtType = ShirtType = {}));
var ShirtSize;
(function (ShirtSize) {
    ShirtSize["XS"] = "XS";
    ShirtSize["S"] = "S";
    ShirtSize["M"] = "M";
    ShirtSize["L"] = "L";
    ShirtSize["XL"] = "XL";
    ShirtSize["XXL"] = "XXL";
})(ShirtSize || (exports.ShirtSize = ShirtSize = {}));
(0, graphql_1.registerEnumType)(ShirtType, {
    name: 'ShirtType',
    description: 'Tipos de camiseta disponibles'
});
(0, graphql_1.registerEnumType)(ShirtSize, {
    name: 'ShirtSize',
    description: 'Tallas de camiseta disponibles'
});
let Competitor = class Competitor {
    constructor(data = {}) {
        this.id = data.id || '';
        this.firstName = data.firstName || '';
        this.lastName = data.lastName || '';
        this.email = data.email || '';
        this.phone = data.phone || '';
        this.shirtType = data.shirtType || ShirtType.COTTON;
        this.shirtSize = data.shirtSize || ShirtSize.M;
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt || new Date();
        this.fullName = `${this.firstName} ${this.lastName}`;
    }
};
exports.Competitor = Competitor;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], Competitor.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Competitor.prototype, "firstName", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Competitor.prototype, "lastName", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Competitor.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Competitor.prototype, "phone", void 0);
__decorate([
    (0, graphql_1.Field)(() => ShirtType),
    __metadata("design:type", String)
], Competitor.prototype, "shirtType", void 0);
__decorate([
    (0, graphql_1.Field)(() => ShirtSize),
    __metadata("design:type", String)
], Competitor.prototype, "shirtSize", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Competitor.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Competitor.prototype, "updatedAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Competitor.prototype, "fullName", void 0);
exports.Competitor = Competitor = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [Object])
], Competitor);
//# sourceMappingURL=competitor.entity.js.map