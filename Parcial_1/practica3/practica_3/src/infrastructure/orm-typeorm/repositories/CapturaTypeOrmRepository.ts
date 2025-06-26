import { Captura } from "../../../domain/entities/Captura";
import { ICapturaRepository } from "../../../domain/repositories/ICapturaRepository";
import { AppDataSource } from "../../../shared/database/typeorm-datasource";
import { CapturaEntity } from "../entities/CapturaEntity";

export class CapturaRepositoryTypeORM implements ICapturaRepository {
  private repo = AppDataSource.getRepository(CapturaEntity);

  private toDomain(entity: CapturaEntity): Captura {
    return new Captura(
      String(entity.id),
      entity.fecha,
      entity.imagenUrl,
      entity.ubicacion,
      entity.plagaId
    );
  }

  async crear(captura: Captura): Promise<Captura> {
    const nueva = this.repo.create({
      id: Number(captura.id),
      fecha: captura.fecha,
      imagenUrl: captura.imagenUrl,
      ubicacion: captura.ubicacion,
      plagaId: captura.plagaId,
    });
    const saved = await this.repo.save(nueva);
    return this.toDomain(saved);
  }

  async listar(): Promise<Captura[]> {
    const entities = await this.repo.find();
    return entities.map(this.toDomain);
  }

  async buscarPorId(id: string): Promise<Captura | null> {
    const entity = await this.repo.findOneBy({ id: Number(id) });
    return entity ? this.toDomain(entity) : null;
  }

  async eliminar(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  async buscarPorPlaga(plagaId: string): Promise<Captura[]> {
    const entities = await this.repo.find({ where: { plagaId: Number(plagaId) } });
    return entities.map(this.toDomain);
  }
}
