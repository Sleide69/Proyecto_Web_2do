import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}
  create(createClienteDto: CreateClienteDto) {
    const cliente = this.clienteRepository.create(createClienteDto);
    return this.clienteRepository.save(cliente);
  }

  findAll() {
    return this.clienteRepository.find();
  }

  findOne(id: number) {
    return this.clienteRepository.findOneBy({ id });
  }

  update(id: number, updateClienteDto: UpdateClienteDto) {
    return this.clienteRepository.update(id, updateClienteDto).then(() => {
      return this.findOne(id);
    });
  }
  remove(id: number) {
    return this.clienteRepository.delete(id).then(() => {
      return { deleted: true };
    });
  }   
}