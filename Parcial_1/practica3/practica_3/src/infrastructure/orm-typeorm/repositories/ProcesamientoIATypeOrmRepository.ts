import { ProcesamientoIA } from "../../../domain/entities/ProcesamientoIA";
import { IProcesamientoIARepository } from "../../../domain/repositories/IProcesamientoIARepository";
import { AppDataSource } from "../../../shared/database/typeorm-datasource";
import { ProcesamientoIAEntity } from "../entities/ProcesamientoIAEntity";

export class ProcesamientoIARepositoryTypeORM implements IProcesamientoIARepository {
  private repo = AppDataSource.getRepository(ProcesamientoIAEntity);

  async crear(proc: ProcesamientoIA): Promise<ProcesamientoIA> {
    const nuevo = this.repo.create(proc);
    return await this.repo.save(nuevo);
  }

  async listar(): Promise<ProcesamientoIA[]> {
    return await this.repo.find();
  }

  async obtenerPorCaptura(idCaptura: string): Promise<ProcesamientoIA[]> {
    return await this.repo.find({
      where: { idCaptura }
    });
  }
}
