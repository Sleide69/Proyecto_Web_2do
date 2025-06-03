import { ProcesamientoIA } from "../../../domain/entities/ProcesamientoIA";
import { IProcesamientoIARepository } from "../../../domain/repositories/IProcesamientoIARepository";
import { AppDataSource } from "../../../shared/database/typeorm-datasource";
import { ProcesamientoIAEntity } from "../entities/ProcesamientoIAEntity";

export class ProcesamientoIARepositoryTypeORM implements IProcesamientoIARepository {
  private repo = AppDataSource.getRepository(ProcesamientoIAEntity);

  private toDomain(entity: ProcesamientoIAEntity): ProcesamientoIA {
    return {
      id: entity.id.toString(),
      capturaId: entity.capturaId.toString(),
      resultado: entity.resultado,
      confianza: entity.confianza, // Added confianza property
      modeloUsado: entity.modeloUsado,
      fechaProcesamiento: entity.fecha
    };
  }

  private toEntity(proc: ProcesamientoIA): ProcesamientoIAEntity {
    const entity = new ProcesamientoIAEntity();
    entity.id = Number(proc.id);
    entity.capturaId = Number(proc.capturaId);
    entity.resultado = proc.resultado;
    entity.confianza = proc.confianza;
    entity.modeloUsado = proc.modeloUsado;
    entity.fecha = proc.fechaProcesamiento;
    return entity;
  }

  async crear(proc: ProcesamientoIA): Promise<ProcesamientoIA> {
    const nuevo = this.toEntity(proc);
    const saved = await this.repo.save(nuevo);
    return this.toDomain(saved);
  }

  async listar(): Promise<ProcesamientoIA[]> {
    const entities = await this.repo.find();
    return entities.map((e) => this.toDomain(e));
  }

  async obtenerPorCaptura(capturaId: string): Promise<ProcesamientoIA | null> {
    const entity = await this.repo.findOneBy({ capturaId: Number(capturaId) });
    return entity ? this.toDomain(entity) : null;
  }
}
