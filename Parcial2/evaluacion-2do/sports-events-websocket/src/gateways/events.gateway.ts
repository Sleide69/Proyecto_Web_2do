import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

interface RaceRegistrationData {
  raceId: string;
  raceName: string;
  competitorName: string;
  registrationId: string;
  totalRegistrations: number;
  availableSpots: number;
}

interface RaceStatusUpdate {
  raceId: string;
  raceName: string;
  oldStatus: string;
  newStatus: string;
  timestamp: Date;
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(EventsGateway.name);
  private connectedClients = new Map<string, Socket>();

  handleConnection(client: Socket) {
    this.logger.log(`Cliente conectado: ${client.id}`);
    this.connectedClients.set(client.id, client);
    
    // Enviar mensaje de bienvenida
    client.emit('connection-established', {
      message: 'Conectado al servidor de eventos deportivos',
      clientId: client.id,
      timestamp: new Date(),
    });
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Cliente desconectado: ${client.id}`);
    this.connectedClients.delete(client.id);
  }

  // Suscribirse a actualizaciones de una carrera específica
  @SubscribeMessage('subscribe-to-race')
  handleSubscribeToRace(
    @MessageBody() data: { raceId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const roomName = `race-${data.raceId}`;
    client.join(roomName);
    
    this.logger.log(`Cliente ${client.id} se suscribió a carrera ${data.raceId}`);
    
    client.emit('subscription-confirmed', {
      raceId: data.raceId,
      message: `Suscrito a actualizaciones de la carrera ${data.raceId}`,
      timestamp: new Date(),
    });
  }

  // Desuscribirse de actualizaciones de una carrera
  @SubscribeMessage('unsubscribe-from-race')
  handleUnsubscribeFromRace(
    @MessageBody() data: { raceId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const roomName = `race-${data.raceId}`;
    client.leave(roomName);
    
    this.logger.log(`Cliente ${client.id} se desuscribió de carrera ${data.raceId}`);
    
    client.emit('unsubscription-confirmed', {
      raceId: data.raceId,
      message: `Desuscrito de actualizaciones de la carrera ${data.raceId}`,
      timestamp: new Date(),
    });
  }

  // Obtener estado actual de las carreras
  @SubscribeMessage('get-races-status')
  handleGetRacesStatus(@ConnectedSocket() client: Socket) {
    // En una implementación real, esto vendría de la base de datos
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

  // Métodos para ser llamados desde otros servicios
  notifyNewRegistration(data: RaceRegistrationData) {
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

  notifyRaceStatusChange(data: RaceStatusUpdate) {
    const roomName = `race-${data.raceId}`;
    
    this.server.to(roomName).emit('race-status-changed', {
      type: 'RACE_STATUS_CHANGED',
      raceId: data.raceId,
      raceName: data.raceName,
      oldStatus: data.oldStatus,
      newStatus: data.newStatus,
      timestamp: data.timestamp,
    });

    // También notificar globalmente
    this.server.emit('global-race-update', {
      type: 'RACE_STATUS_CHANGED',
      raceId: data.raceId,
      raceName: data.raceName,
      newStatus: data.newStatus,
      timestamp: data.timestamp,
    });

    this.logger.log(`Cambio de estado notificado para carrera ${data.raceId}: ${data.oldStatus} -> ${data.newStatus}`);
  }

  notifyRegistrationCancelled(raceId: string, registrationId: string, competitorName: string) {
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

  // Simular un nuevo registro (para demostración)
  @SubscribeMessage('simulate-registration')
  handleSimulateRegistration(
    @MessageBody() data: RaceRegistrationData,
    @ConnectedSocket() client: Socket,
  ) {
    const roomName = `race-${data.raceId}`;
    
    // Enviar actualización a todos los clientes suscritos a esta carrera
    this.server.to(roomName).emit('race-registration-update', {
      ...data,
      timestamp: new Date(),
    });
    
    this.logger.log(`Simulación de registro enviada para carrera ${data.raceId}`);
  }

  // Simular cambio de estado de carrera (para demostración)
  @SubscribeMessage('simulate-status-change')
  handleSimulateStatusChange(
    @MessageBody() data: RaceStatusUpdate,
    @ConnectedSocket() client: Socket,
  ) {
    const roomName = `race-${data.raceId}`;
    
    // Enviar actualización a todos los clientes suscritos a esta carrera
    this.server.to(roomName).emit('race-status-update', {
      ...data,
      timestamp: new Date(),
    });
    
    this.logger.log(`Simulación de cambio de estado enviada para carrera ${data.raceId}`);
  }

  // Broadcast a todos los clientes conectados
  broadcastToAll(event: string, data: any) {
    this.server.emit(event, {
      ...data,
      timestamp: new Date(),
    });
  }

  // Obtener estadísticas de conexiones
  getConnectionStats() {
    return {
      totalConnections: this.connectedClients.size,
      connectedClients: Array.from(this.connectedClients.keys()),
    };
  }
}
