import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Captura } from './entities/captura.entity';
import { CreateCapturaDto } from './dto/create-captura.dto';
import { UpdateCapturaDto } from './dto/update-captura.dto';

@Injectable()
export class CapturaService {
  constructor(
    @InjectRepository(Captura)
    private repo: Repository<Captura>,
  ) {}

  async create(dto: CreateCapturaDto) {
    const nueva = this.repo.create(dto);
    return this.repo.save(nueva);
  }

  async findAll() {
    return this.repo.find();
  }

  async update(id: number, dto: UpdateCapturaDto) {
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
