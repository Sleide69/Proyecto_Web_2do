import { Notificacion } from "../../../domain/entities/Notificacion";
import { INotificacionRepository } from "../../../domain/repositories/INotificacionRepository";
import { AppDataSource } from "../../../shared/database/typeorm.config";
import { NotificacionEntity } from "../entities/NotificacionEntity";

export class NotificacionRepositoryTypeORM implements INotificacionRepository {
  private repo = AppDataSource.getRepository(NotificacionEntity);

  async crear(notificacion: Notificacion): Promise<Notificacion> {
    const nueva = this.repo.create(notificacion);
    return await this.repo.save(nueva);
  }

  async listar(): Promise<Notificacion[]> {
    return await this.repo.find();
  }
}
