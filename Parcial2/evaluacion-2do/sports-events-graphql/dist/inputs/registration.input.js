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
exports.UpdateRegistrationInput = exports.CreateRegistrationInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const registration_entity_1 = require("../entities/registration.entity");
const competitor_input_1 = require("./competitor.input");
const payment_input_1 = require("./payment.input");
let CreateRegistrationInput = class CreateRegistrationInput {
};
exports.CreateRegistrationInput = CreateRegistrationInput;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRegistrationInput.prototype, "raceId", void 0);
__decorate([
    (0, graphql_1.Field)(() => competitor_input_1.CreateCompetitorInput),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", competitor_input_1.CreateCompetitorInput)
], CreateRegistrationInput.prototype, "competitor", void 0);
__decorate([
    (0, graphql_1.Field)(() => payment_input_1.CreatePaymentInput, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", payment_input_1.CreatePaymentInput)
], CreateRegistrationInput.prototype, "payment", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRegistrationInput.prototype, "notes", void 0);
exports.CreateRegistrationInput = CreateRegistrationInput = __decorate([
    (0, graphql_1.InputType)()
], CreateRegistrationInput);
let UpdateRegistrationInput = class UpdateRegistrationInput {
};
exports.UpdateRegistrationInput = UpdateRegistrationInput;
__decorate([
    (0, graphql_1.Field)(() => registration_entity_1.RegistrationStatus, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(registration_entity_1.RegistrationStatus),
    __metadata("design:type", String)
], UpdateRegistrationInput.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateRegistrationInput.prototype, "notes", void 0);
exports.UpdateRegistrationInput = UpdateRegistrationInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateRegistrationInput);
//# sourceMappingURL=registration.input.js.map