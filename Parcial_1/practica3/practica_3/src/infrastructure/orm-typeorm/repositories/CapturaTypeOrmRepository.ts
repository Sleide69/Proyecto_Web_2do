import { Captura } from "../../../domain/entities/Captura";
import { ICapturaRepository } from "../../../domain/repositories/ICapturaRepository";
import { AppDataSource } from "../../../shared/database/typeorm.config";
import { CapturaEntity } from "../entities/CapturaEntity";

export class CapturaRepositoryTypeORM implements ICapturaRepository {
  private repo = AppDataSource.getRepository(CapturaEntity);

  async crear(captura: Captura): Promise<Captura> {
    const nueva = this.repo.create(captura);
    return await this.repo.save(nueva);
  }

  async listar(): Promise<Captura[]> {
    return await this.repo.find();
  }
}
