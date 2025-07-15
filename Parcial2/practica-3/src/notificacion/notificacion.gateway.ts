import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { NotificacionService } from './notificacion.service';
import { CreateNotificacionDto } from './dto/create-notificacion.dto';
import { UpdateNotificacionDto } from './dto/update-notificacion.dto';

@WebSocketGateway({ cors: true })
export class NotificacionGateway {
  @WebSocketServer()
  wss: Server;

  constructor(private readonly notificacionService: NotificacionService) {}

  @SubscribeMessage('crearNotificacion')
  async create(@MessageBody() dto: CreateNotificacionDto) {
    await this.notificacionService.create(dto);
    const lista = await this.notificacionService.findAll();
    this.wss.emit('notificacionActualizada', lista);
    return lista;
  }

  @SubscribeMessage('listarNotificaciones')
  async findAll() {
    const lista = await this.notificacionService.findAll();
    return lista;
  }

  @SubscribeMessage('actualizarNotificacion')
  async update(
    @MessageBody()
    payload: {
      id: number;
      dto: UpdateNotificacionDto;
    },
  ) {
    await this.notificacionService.update(payload.id, payload.dto);
    const lista = await this.notificacionService.findAll();
    this.wss.emit('notificacionActualizada', lista);
    return lista;
  }

  @SubscribeMessage('eliminarNotificacion')
  async remove(@MessageBody() id: number) {
    await this.notificacionService.remove(id);
    const lista = await this.notificacionService.findAll();
    this.wss.emit('notificacionActualizada', lista);
    return lista;
  }
}
