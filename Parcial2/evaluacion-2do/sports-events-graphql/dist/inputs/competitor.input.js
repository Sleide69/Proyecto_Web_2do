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
exports.UpdateCompetitorInput = exports.CreateCompetitorInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const competitor_entity_1 = require("../entities/competitor.entity");
let CreateCompetitorInput = class CreateCompetitorInput {
};
exports.CreateCompetitorInput = CreateCompetitorInput;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCompetitorInput.prototype, "firstName", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCompetitorInput.prototype, "lastName", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateCompetitorInput.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCompetitorInput.prototype, "phone", void 0);
__decorate([
    (0, graphql_1.Field)(() => competitor_entity_1.ShirtType),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(competitor_entity_1.ShirtType),
    __metadata("design:type", String)
], CreateCompetitorInput.prototype, "shirtType", void 0);
__decorate([
    (0, graphql_1.Field)(() => competitor_entity_1.ShirtSize),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(competitor_entity_1.ShirtSize),
    __metadata("design:type", String)
], CreateCompetitorInput.prototype, "shirtSize", void 0);
exports.CreateCompetitorInput = CreateCompetitorInput = __decorate([
    (0, graphql_1.InputType)()
], CreateCompetitorInput);
let UpdateCompetitorInput = class UpdateCompetitorInput {
};
exports.UpdateCompetitorInput = UpdateCompetitorInput;
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCompetitorInput.prototype, "firstName", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCompetitorInput.prototype, "lastName", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UpdateCompetitorInput.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCompetitorInput.prototype, "phone", void 0);
__decorate([
    (0, graphql_1.Field)(() => competitor_entity_1.ShirtType, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(competitor_entity_1.ShirtType),
    __metadata("design:type", String)
], UpdateCompetitorInput.prototype, "shirtType", void 0);
__decorate([
    (0, graphql_1.Field)(() => competitor_entity_1.ShirtSize, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(competitor_entity_1.ShirtSize),
    __metadata("design:type", String)
], UpdateCompetitorInput.prototype, "shirtSize", void 0);
exports.UpdateCompetitorInput = UpdateCompetitorInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateCompetitorInput);
//# sourceMappingURL=competitor.input.js.map