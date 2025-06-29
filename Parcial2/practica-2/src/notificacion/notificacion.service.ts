import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notificacion } from './entities/notificacion.entity';
import { CreateNotificacionDto } from './dto/create-notificacion.dto';
import { UpdateNotificacionDto } from './dto/update-notificacion.dto';

@Injectable()
export class NotificacionService {
  constructor(@InjectRepository(Notificacion) private repo: Repository<Notificacion>) {}

  create(dto: CreateNotificacionDto) {
    const notificacion = this.repo.create(dto);
    return this.repo.save(notificacion);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const notificacion = await this.repo.findOneBy({ id });
    if (!notificacion) throw new NotFoundException('Notificación no encontrada');
    return notificacion;
  }

  async update(id: number, dto: UpdateNotificacionDto) {
    const notificacion = await this.findOne(id);
    Object.assign(notificacion, dto);
    return this.repo.save(notificacion);
  }

  async remove(id: number) {
    const notificacion = await this.findOne(id);
    return this.repo.remove(notificacion);
  }
}
