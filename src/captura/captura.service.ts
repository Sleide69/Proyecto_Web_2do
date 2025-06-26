import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Captura } from './entities/captura.entity';
import { CreateCapturaDto } from './dto/create-captura.dto';
import { UpdateCapturaDto } from './dto/update-captura.dto';

@Injectable()
export class CapturaService {
  constructor(@InjectRepository(Captura) private repo: Repository<Captura>) {}

  create(dto: CreateCapturaDto) {
    const captura = this.repo.create(dto);
    return this.repo.save(captura);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const captura = await this.repo.findOneBy({ id });
    if (!captura) throw new NotFoundException('Captura no encontrada');
    return captura;
  }

  async update(id: number, dto: UpdateCapturaDto) {
    const captura = await this.findOne(id);
    Object.assign(captura, dto);
    return this.repo.save(captura);
  }

  async remove(id: number) {
    const captura = await this.findOne(id);
    return this.repo.remove(captura);
  }
}
