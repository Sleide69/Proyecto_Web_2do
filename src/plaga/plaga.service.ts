import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plaga } from './entities/plaga.entity';
import { CreatePlagaDto } from './dto/create-plaga.dto';
import { UpdatePlagaDto } from './dto/update-plaga.dto';

@Injectable()
export class PlagaService {
  constructor(@InjectRepository(Plaga) private repo: Repository<Plaga>) {}

  create(dto: CreatePlagaDto) {
    const plaga = this.repo.create(dto);
    return this.repo.save(plaga);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const plaga = await this.repo.findOneBy({ id });
    if (!plaga) throw new NotFoundException('Plaga no encontrada');
    return plaga;
  }

  async update(id: number, dto: UpdatePlagaDto) {
    const plaga = await this.findOne(id);
    Object.assign(plaga, dto);
    return this.repo.save(plaga);
  }

  async remove(id: number) {
    const plaga = await this.findOne(id);
    return this.repo.remove(plaga);
  }
}
