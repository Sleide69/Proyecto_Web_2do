import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notificacion } from './entities/notificacion.entity';
import { CreateNotificacionDto } from './dto/create-notificacion.dto';
import { UpdateNotificacionDto } from './dto/update-notificacion.dto';

@Injectable()
export class NotificacionService {
  constructor(
    @InjectRepository(Notificacion)
    private repo: Repository<Notificacion>,
  ) {}

  async create(dto: CreateNotificacionDto) {
    const nueva = this.repo.create(dto);
    return this.repo.save(nueva);
  }

  async findAll() {
    return this.repo.find();
  }

  async update(id: number, dto: UpdateNotificacionDto) {
    await this.repo.update(id, dto);
    return this.repo.findOneBy({ id });
  }
  async findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  async remove(id: number) {
    return this.repo.delete(id);
  }
}
