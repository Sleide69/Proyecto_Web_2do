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
exports.RegistrationService = void 0;
const common_1 = require("@nestjs/common");
const json_persistence_service_1 = require("../persistence/json-persistence.service");
const registration_entity_1 = require("../entities/registration.entity");
const race_entity_1 = require("../entities/race.entity");
const payment_entity_1 = require("../entities/payment.entity");
const race_service_1 = require("./race.service");
const competitor_service_1 = require("./competitor.service");
const payment_service_1 = require("./payment.service");
const uuid_1 = require("uuid");
let RegistrationService = class RegistrationService {
    constructor(persistence, raceService, competitorService, paymentService) {
        this.persistence = persistence;
        this.raceService = raceService;
        this.competitorService = competitorService;
        this.paymentService = paymentService;
    }
    async createRegistration(createRegistrationDto) {
        const race = await this.raceService.findRaceById(createRegistrationDto.raceId);
        if (race.status !== race_entity_1.RaceStatus.OPEN_REGISTRATION) {
            throw new common_1.BadRequestException('La carrera no está disponible para registro');
        }
        const now = new Date();
        const registrationStart = new Date(race.registrationStartDate);
        const registrationEnd = new Date(race.registrationEndDate);
        if (now < registrationStart) {
            throw new common_1.BadRequestException('El período de registro aún no ha iniciado');
        }
        if (now > registrationEnd) {
            throw new common_1.BadRequestException('El período de registro ha terminado');
        }
        const existingRegistrations = this.persistence.findBy('registrations', { raceId: race.id });
        if (existingRegistrations.length >= race.maxParticipants) {
            throw new common_1.BadRequestException('No hay cupos disponibles para esta carrera');
        }
        let competitor;
        const existingCompetitor = await this.competitorService.findCompetitorByEmail(createRegistrationDto.competitor.email);
        if (existingCompetitor) {
            const existingRegistration = this.persistence.findOneBy('registrations', {
                raceId: race.id,
                competitorId: existingCompetitor.id
            });
            if (existingRegistration) {
                throw new common_1.ConflictException('El competidor ya está registrado en esta carrera');
            }
            competitor = existingCompetitor;
        }
        else {
            competitor = await this.competitorService.createCompetitor(createRegistrationDto.competitor);
        }
        let payment;
        if (createRegistrationDto.payment) {
            if (createRegistrationDto.payment.amount !== race.registrationFee) {
                throw new common_1.BadRequestException(`El monto del pago (${createRegistrationDto.payment.amount}) no coincide con la tarifa de registro (${race.registrationFee})`);
            }
            payment = await this.paymentService.createPayment(createRegistrationDto.payment);
        }
        const registration = new registration_entity_1.Registration({
            id: (0, uuid_1.v4)(),
            raceId: race.id,
            competitorId: competitor.id,
            paymentId: payment === null || payment === void 0 ? void 0 : payment.id,
            status: payment ? registration_entity_1.RegistrationStatus.PENDING : registration_entity_1.RegistrationStatus.CONFIRMED,
            registrationDate: new Date(),
            notes: createRegistrationDto.notes,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        registration.generateConfirmationCode();
        const savedRegistration = this.persistence.create('registrations', registration);
        savedRegistration.race = race;
        savedRegistration.competitor = competitor;
        savedRegistration.payment = payment;
        return savedRegistration;
    }
    async findAllRegistrations() {
        const registrations = this.persistence.findAll('registrations');
        return this.loadRelatedData(registrations);
    }
    async findRegistrationById(id) {
        const registration = this.persistence.findById('registrations', id);
        if (!registration) {
            throw new common_1.NotFoundException(`Registro con ID ${id} no encontrado`);
        }
        const [loadedRegistration] = await this.loadRelatedData([registration]);
        return loadedRegistration;
    }
    async updateRegistration(id, updateRegistrationDto) {
        await this.findRegistrationById(id);
        const updatedRegistration = this.persistence.update('registrations', id, updateRegistrationDto);
        if (!updatedRegistration) {
            throw new common_1.NotFoundException(`Registro con ID ${id} no encontrado`);
        }
        const [loadedRegistration] = await this.loadRelatedData([updatedRegistration]);
        return loadedRegistration;
    }
    async cancelRegistration(id) {
        const registration = await this.findRegistrationById(id);
        if (registration.status === registration_entity_1.RegistrationStatus.CANCELLED) {
            throw new common_1.BadRequestException('El registro ya está cancelado');
        }
        if (registration.status === registration_entity_1.RegistrationStatus.COMPLETED) {
            throw new common_1.BadRequestException('No se puede cancelar un registro completado');
        }
        if (registration.paymentId && registration.payment) {
            if (registration.payment.status === payment_entity_1.PaymentStatus.COMPLETED) {
                await this.paymentService.refundPayment(registration.paymentId);
            }
            else {
                await this.paymentService.cancelPayment(registration.paymentId);
            }
        }
        return this.updateRegistration(id, { status: registration_entity_1.RegistrationStatus.CANCELLED });
    }
    async confirmRegistration(id) {
        const registration = await this.findRegistrationById(id);
        if (registration.status === registration_entity_1.RegistrationStatus.CONFIRMED) {
            throw new common_1.BadRequestException('El registro ya está confirmado');
        }
        if (registration.paymentId && registration.payment) {
            if (registration.payment.status !== payment_entity_1.PaymentStatus.COMPLETED) {
                throw new common_1.BadRequestException('El pago debe estar completado antes de confirmar el registro');
            }
        }
        return this.updateRegistration(id, { status: registration_entity_1.RegistrationStatus.CONFIRMED });
    }
    async getRegistrationSummary(id) {
        const registration = await this.findRegistrationById(id);
        if (!registration.race || !registration.competitor) {
            throw new common_1.BadRequestException('Datos del registro incompletos');
        }
        const summary = {
            id: registration.id,
            confirmationCode: registration.confirmationCode || '',
            status: registration.status,
            registrationDate: registration.registrationDate,
            race: {
                id: registration.race.id,
                name: registration.race.name,
                type: registration.race.type,
                eventDate: registration.race.eventDate,
                location: registration.race.location,
                distance: registration.race.distance,
                registrationFee: registration.race.registrationFee
            },
            competitor: {
                id: registration.competitor.id,
                fullName: registration.competitor.fullName,
                email: registration.competitor.email,
                phone: registration.competitor.phone,
                shirtType: registration.competitor.shirtType,
                shirtSize: registration.competitor.shirtSize
            }
        };
        if (registration.payment) {
            summary.payment = {
                id: registration.payment.id,
                amount: registration.payment.amount,
                method: registration.payment.method,
                status: registration.payment.status,
                transactionId: registration.payment.transactionId,
                paymentDate: registration.payment.paymentDate
            };
        }
        return summary;
    }
    async getRegistrationsByRace(raceId) {
        const registrations = this.persistence.findBy('registrations', { raceId });
        return this.loadRelatedData(registrations);
    }
    async getRegistrationsByCompetitor(competitorId) {
        const registrations = this.persistence.findBy('registrations', { competitorId });
        return this.loadRelatedData(registrations);
    }
    async loadRelatedData(registrations) {
        const races = this.persistence.findAll('races');
        const competitors = this.persistence.findAll('competitors');
        const payments = this.persistence.findAll('payments');
        return registrations.map(registration => {
            registration.race = races.find(r => r.id === registration.raceId);
            registration.competitor = competitors.find(c => c.id === registration.competitorId);
            if (registration.paymentId) {
                registration.payment = payments.find(p => p.id === registration.paymentId);
            }
            return registration;
        });
    }
};
exports.RegistrationService = RegistrationService;
exports.RegistrationService = RegistrationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [json_persistence_service_1.JsonPersistenceService,
        race_service_1.RaceService,
        competitor_service_1.CompetitorService,
        payment_service_1.PaymentService])
], RegistrationService);
//# sourceMappingURL=registration.service.js.map