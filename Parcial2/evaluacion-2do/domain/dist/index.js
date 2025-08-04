"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessValidationService = exports.BaseDomainService = exports.DomainEventType = exports.RegistrationSummaryDto = exports.CreatePaymentDto = exports.UpdateRegistrationDto = exports.CreateRegistrationDto = exports.UpdateCompetitorDto = exports.CreateCompetitorDto = exports.UpdateRaceDto = exports.CreateRaceDto = exports.PaymentStatus = exports.PaymentMethod = exports.RegistrationStatus = exports.ShirtSize = exports.ShirtType = exports.RaceStatus = exports.RaceType = exports.Payment = exports.Registration = exports.Competitor = exports.Race = exports.BaseEntity = void 0;
// Entidades
__exportStar(require("./entities"), exports);
// Enumeraciones
__exportStar(require("./enums"), exports);
// DTOs
__exportStar(require("./dtos"), exports);
// Interfaces
__exportStar(require("./interfaces"), exports);
// Servicios de Dominio
__exportStar(require("./services"), exports);
// Re-exportaciones organizadas por categoría
var entities_1 = require("./entities");
// Entidades principales
Object.defineProperty(exports, "BaseEntity", { enumerable: true, get: function () { return entities_1.BaseEntity; } });
Object.defineProperty(exports, "Race", { enumerable: true, get: function () { return entities_1.Race; } });
Object.defineProperty(exports, "Competitor", { enumerable: true, get: function () { return entities_1.Competitor; } });
Object.defineProperty(exports, "Registration", { enumerable: true, get: function () { return entities_1.Registration; } });
Object.defineProperty(exports, "Payment", { enumerable: true, get: function () { return entities_1.Payment; } });
var enums_1 = require("./enums");
// Enums más utilizados
Object.defineProperty(exports, "RaceType", { enumerable: true, get: function () { return enums_1.RaceType; } });
Object.defineProperty(exports, "RaceStatus", { enumerable: true, get: function () { return enums_1.RaceStatus; } });
Object.defineProperty(exports, "ShirtType", { enumerable: true, get: function () { return enums_1.ShirtType; } });
Object.defineProperty(exports, "ShirtSize", { enumerable: true, get: function () { return enums_1.ShirtSize; } });
Object.defineProperty(exports, "RegistrationStatus", { enumerable: true, get: function () { return enums_1.RegistrationStatus; } });
Object.defineProperty(exports, "PaymentMethod", { enumerable: true, get: function () { return enums_1.PaymentMethod; } });
Object.defineProperty(exports, "PaymentStatus", { enumerable: true, get: function () { return enums_1.PaymentStatus; } });
var dtos_1 = require("./dtos");
// DTOs principales
Object.defineProperty(exports, "CreateRaceDto", { enumerable: true, get: function () { return dtos_1.CreateRaceDto; } });
Object.defineProperty(exports, "UpdateRaceDto", { enumerable: true, get: function () { return dtos_1.UpdateRaceDto; } });
Object.defineProperty(exports, "CreateCompetitorDto", { enumerable: true, get: function () { return dtos_1.CreateCompetitorDto; } });
Object.defineProperty(exports, "UpdateCompetitorDto", { enumerable: true, get: function () { return dtos_1.UpdateCompetitorDto; } });
Object.defineProperty(exports, "CreateRegistrationDto", { enumerable: true, get: function () { return dtos_1.CreateRegistrationDto; } });
Object.defineProperty(exports, "UpdateRegistrationDto", { enumerable: true, get: function () { return dtos_1.UpdateRegistrationDto; } });
Object.defineProperty(exports, "CreatePaymentDto", { enumerable: true, get: function () { return dtos_1.CreatePaymentDto; } });
Object.defineProperty(exports, "RegistrationSummaryDto", { enumerable: true, get: function () { return dtos_1.RegistrationSummaryDto; } });
var interfaces_1 = require("./interfaces");
Object.defineProperty(exports, "DomainEventType", { enumerable: true, get: function () { return interfaces_1.DomainEventType; } });
var services_1 = require("./services");
// Servicios de dominio
Object.defineProperty(exports, "BaseDomainService", { enumerable: true, get: function () { return services_1.BaseDomainService; } });
Object.defineProperty(exports, "BusinessValidationService", { enumerable: true, get: function () { return services_1.BusinessValidationService; } });
//# sourceMappingURL=index.js.map