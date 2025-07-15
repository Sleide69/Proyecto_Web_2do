import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { CapturaService } from './captura.service';
import { CreateCapturaDto } from './dto/create-captura.dto';
import { UpdateCapturaDto } from './dto/update-captura.dto';

@WebSocketGateway({ cors: true })
export class CapturaGateway {
  @WebSocketServer()
  wss: Server;

  constructor(private readonly capturaService: CapturaService) {}

  @SubscribeMessage('crearCaptura')
  async create(@MessageBody() dto: CreateCapturaDto) {
    await this.capturaService.create(dto);
    const capturas = await this.capturaService.findAll();
    this.wss.emit('capturaActualizada', capturas);
    return capturas;
  }

  @SubscribeMessage('listarCapturas')
  async findAll() {
    const capturas = await this.capturaService.findAll();
    return capturas;
  }

  @SubscribeMessage('actualizarCaptura')
  async update(
    @MessageBody()
    payload: {
      id: number;
      dto: UpdateCapturaDto;
    },
  ) {
    await this.capturaService.update(payload.id, payload.dto);
    const capturas = await this.capturaService.findAll();
    this.wss.emit('capturaActualizada', capturas);
    return capturas;
  }

  @SubscribeMessage('eliminarCaptura')
  async remove(@MessageBody() id: number) {
    await this.capturaService.remove(id);
    const capturas = await this.capturaService.findAll();
    this.wss.emit('capturaActualizada', capturas);
    return capturas;
  }
}
