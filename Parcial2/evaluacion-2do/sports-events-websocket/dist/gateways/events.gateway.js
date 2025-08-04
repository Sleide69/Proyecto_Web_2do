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
var EventsGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
let EventsGateway = EventsGateway_1 = class EventsGateway {
    constructor() {
        this.logger = new common_1.Logger(EventsGateway_1.name);
        this.connectedClients = new Map();
    }
    handleConnection(client) {
        this.logger.log(`Cliente conectado: ${client.id}`);
        this.connectedClients.set(client.id, client);
        client.emit('connection-established', {
            message: 'Conectado al servidor de eventos deportivos',
            clientId: client.id,
            timestamp: new Date(),
        });
    }
    handleDisconnect(client) {
        this.logger.log(`Cliente desconectado: ${client.id}`);
        this.connectedClients.delete(client.id);
    }
    handleSubscribeToRace(data, client) {
        const roomName = `race-${data.raceId}`;
        client.join(roomName);
        this.logger.log(`Cliente ${client.id} se suscribió a carrera ${data.raceId}`);
        client.emit('subscription-confirmed', {
            raceId: data.raceId,
            message: `Suscrito a actualizaciones de la carrera ${data.raceId}`,
            timestamp: new Date(),
        });
    }
    handleUnsubscribeFromRace(data, client) {
        const roomName = `race-${data.raceId}`;
        client.leave(roomName);
        this.logger.log(`Cliente ${client.id} se desuscribió de carrera ${data.raceId}`);
        client.emit('unsubscription-confirmed', {
            raceId: data.raceId,
            message: `Desuscrito de actualizaciones de la carrera ${data.raceId}`,
            timestamp: new Date(),
        });
    }
    handleGetRacesStatus(client) {
        const mockRacesStatus = [
            {
                raceId: '1',
                name: 'Maratón Ciudad',
                status: 'OPEN_REGISTRATION',
                totalRegistrations: 45,
                maxParticipants: 100,
                availableSpots: 55,
            },
            {
                raceId: '2',
                name: '10K Parque',
                status: 'PLANNED',
                totalRegistrations: 0,
                maxParticipants: 200,
                availableSpots: 200,
            },
        ];
        client.emit('races-status', {
            races: mockRacesStatus,
            timestamp: new Date(),
        });
    }
    notifyNewRegistration(data) {
        const roomName = `race-${data.raceId}`;
        this.server.to(roomName).emit('new-registration', {
            type: 'NEW_REGISTRATION',
            raceId: data.raceId,
            raceName: data.raceName,
            competitorName: data.competitorName,
            registrationId: data.registrationId,
            totalRegistrations: data.totalRegistrations,
            availableSpots: data.availableSpots,
            timestamp: new Date(),
        });
        this.logger.log(`Nueva inscripción notificada para carrera ${data.raceId}`);
    }
    notifyRaceStatusChange(data) {
        const roomName = `race-${data.raceId}`;
        this.server.to(roomName).emit('race-status-changed', {
            type: 'RACE_STATUS_CHANGED',
            raceId: data.raceId,
            raceName: data.raceName,
            oldStatus: data.oldStatus,
            newStatus: data.newStatus,
            timestamp: data.timestamp,
        });
        this.server.emit('global-race-update', {
            type: 'RACE_STATUS_CHANGED',
            raceId: data.raceId,
            raceName: data.raceName,
            newStatus: data.newStatus,
            timestamp: data.timestamp,
        });
        this.logger.log(`Cambio de estado notificado para carrera ${data.raceId}: ${data.oldStatus} -> ${data.newStatus}`);
    }
    notifyRegistrationCancelled(raceId, registrationId, competitorName) {
        const roomName = `race-${raceId}`;
        this.server.to(roomName).emit('registration-cancelled', {
            type: 'REGISTRATION_CANCELLED',
            raceId,
            registrationId,
            competitorName,
            timestamp: new Date(),
        });
        this.logger.log(`Cancelación de inscripción notificada para carrera ${raceId}`);
    }
    broadcastToAll(event, data) {
        this.server.emit(event, Object.assign(Object.assign({}, data), { timestamp: new Date() }));
    }
    getConnectionStats() {
        return {
            totalConnections: this.connectedClients.size,
            connectedClients: Array.from(this.connectedClients.keys()),
        };
    }
};
exports.EventsGateway = EventsGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], EventsGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('subscribe-to-race'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "handleSubscribeToRace", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('unsubscribe-from-race'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "handleUnsubscribeFromRace", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('get-races-status'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "handleGetRacesStatus", null);
exports.EventsGateway = EventsGateway = EventsGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    })
], EventsGateway);
//# sourceMappingURL=events.gateway.js.map