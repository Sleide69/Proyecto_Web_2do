import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notificacion } from './entities/notificacion.entity';
import { NotificacionService } from './notificacion.service';
import { NotificacionGateway } from './notificacion.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Notificacion])],
  providers: [NotificacionService, NotificacionGateway],
})
export class NotificacionModule {}
