import { Injectable } from '@nestjs/common';
import { CreateProcesamientoIaDto } from './dto/create-procesamiento-ia.dto';
import { UpdateProcesamientoIaDto } from './dto/update-procesamiento-ia.dto';

@Injectable()
export class ProcesamientoIaService {
  create(createProcesamientoIaDto: CreateProcesamientoIaDto) {
    return 'This action adds a new procesamientoIa';
  }

  findAll() {
    return `This action returns all procesamientoIa`;
  }

  findOne(id: number) {
    return `This action returns a #${id} procesamientoIa`;
  }

  update(id: number, updateProcesamientoIaDto: UpdateProcesamientoIaDto) {
    return `This action updates a #${id} procesamientoIa`;
  }

  remove(id: number) {
    return `This action removes a #${id} procesamientoIa`;
  }
}
