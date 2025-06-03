import { Repository } from 'typeorm';
import { PlagaEntity } from '../entities/PlagaEntity';
import { AppDataSource } from '../../../shared/database/typeorm-datasource';
import { IPlagaRepository } from '../../../domain/repositories/IPlagaRepository';
import { Plaga } from '../../../domain/entities/Plaga';

export class PlagaTypeOrmRepository implements IPlagaRepository {
  private repo: Repository<PlagaEntity> = AppDataSource.getRepository(PlagaEntity);

  async guardar(plaga: Plaga): Promise<void> {
    const entity = this.repo.create(plaga);
    await this.repo.save(entity);
  }

  async buscarPorId(id: number): Promise<Plaga | null> {
    const entity = await this.repo.findOneBy({ id });
    return entity ? { ...entity } : null;
  }
}
