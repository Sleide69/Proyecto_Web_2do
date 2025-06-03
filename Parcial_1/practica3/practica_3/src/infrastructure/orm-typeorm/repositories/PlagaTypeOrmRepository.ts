import { Repository } from 'typeorm';
import { PlagaEntity } from '../entities/PlagaEntity.ts';
import { AppDataSource } from '../../../shared/database/typeorm-datasource';
import { IPlagaRepository } from '../../../domain/repositories/IPlagaRepository';
import { Plaga } from '../../../domain/entities/Plaga';

export class PlagaTypeOrmRepository implements IPlagaRepository {
  private repo: Repository<PlagaEntity> = AppDataSource.getRepository(PlagaEntity);

  async guardar(plaga: Plaga): Promise<void> {
    const entity = this.repo.create({
      id: Number(plaga.id),
      nombre: plaga.nombre,
      descripcion: plaga.descripcion,
      tipo: plaga.tipo,
    });
    await this.repo.save(entity);
  }

  async buscarPorId(id: string): Promise<Plaga | null> {
    const entity = await this.repo.findOneBy({ id: Number(id) });
    return entity ? { ...entity, id: entity.id.toString() } : null;
  }

  async crear(plaga: Plaga): Promise<Plaga> {
    const entity = this.repo.create({
      id: Number(plaga.id),
      nombre: plaga.nombre,
      descripcion: plaga.descripcion,
      tipo: plaga.tipo,
    });
    const savedEntity = await this.repo.save(entity);
    return { ...savedEntity, id: savedEntity.id.toString() };
  }

  async listar(): Promise<Plaga[]> {
    const entities = await this.repo.find();
    return entities.map(entity => ({ ...entity, id: entity.id.toString() }));
  }

  async eliminar(id: string): Promise<void> {
    await this.repo.delete(Number(id));
  }
}
