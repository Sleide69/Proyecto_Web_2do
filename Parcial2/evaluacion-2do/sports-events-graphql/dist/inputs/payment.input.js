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
exports.UpdatePaymentInput = exports.CreatePaymentInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const payment_entity_1 = require("../entities/payment.entity");
let CreatePaymentInput = class CreatePaymentInput {
};
exports.CreatePaymentInput = CreatePaymentInput;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreatePaymentInput.prototype, "amount", void 0);
__decorate([
    (0, graphql_1.Field)(() => payment_entity_1.PaymentMethod),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(payment_entity_1.PaymentMethod),
    __metadata("design:type", String)
], CreatePaymentInput.prototype, "method", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePaymentInput.prototype, "transactionId", void 0);
exports.CreatePaymentInput = CreatePaymentInput = __decorate([
    (0, graphql_1.InputType)()
], CreatePaymentInput);
let UpdatePaymentInput = class UpdatePaymentInput {
};
exports.UpdatePaymentInput = UpdatePaymentInput;
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdatePaymentInput.prototype, "amount", void 0);
__decorate([
    (0, graphql_1.Field)(() => payment_entity_1.PaymentMethod, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(payment_entity_1.PaymentMethod),
    __metadata("design:type", String)
], UpdatePaymentInput.prototype, "method", void 0);
__decorate([
    (0, graphql_1.Field)(() => payment_entity_1.PaymentStatus, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(payment_entity_1.PaymentStatus),
    __metadata("design:type", String)
], UpdatePaymentInput.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePaymentInput.prototype, "transactionId", void 0);
exports.UpdatePaymentInput = UpdatePaymentInput = __decorate([
    (0, graphql_1.InputType)()
], UpdatePaymentInput);
//# sourceMappingURL=payment.input.js.map