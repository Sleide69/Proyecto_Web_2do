import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
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
export declare class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private readonly logger;
    private connectedClients;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleSubscribeToRace(data: {
        raceId: string;
    }, client: Socket): void;
    handleUnsubscribeFromRace(data: {
        raceId: string;
    }, client: Socket): void;
    handleGetRacesStatus(client: Socket): void;
    notifyNewRegistration(data: RaceRegistrationData): void;
    notifyRaceStatusChange(data: RaceStatusUpdate): void;
    notifyRegistrationCancelled(raceId: string, registrationId: string, competitorName: string): void;
    broadcastToAll(event: string, data: any): void;
    getConnectionStats(): {
        totalConnections: number;
        connectedClients: string[];
    };
}
export {};
