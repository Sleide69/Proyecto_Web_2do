import { Notificacion } from "../../../domain/entities/Notificacion";
import { INotificacionRepository } from "../../../domain/repositories/INotificacionRepository";
import { AppDataSource } from "../../../shared/database/typeorm-datasource";
import { NotificacionEntity } from "../entities/NotificacionEntity";

export class NotificacionRepositoryTypeORM implements INotificacionRepository {
  private repo = AppDataSource.getRepository(NotificacionEntity);

  private toEntity(notif: Notificacion): NotificacionEntity {
    const entity = new NotificacionEntity();
    entity.id = Number(notif.id);
    entity.mensaje = notif.mensaje;
    entity.usuarioEmail = notif.usuarioEmail ?? '';
    entity.fecha = notif.fecha;
    entity.enviada = notif.enviada;
    return entity;
  }

  private toDomain(entity: NotificacionEntity): Notificacion {
    return new Notificacion(
      entity.id.toString(),
      entity.mensaje,
      entity.fecha,
      entity.usuarioEmail, // Add the missing destinatario argument
      entity.enviada,
      entity.capturaId
    );
  }

  async crear(notificacion: Notificacion): Promise<Notificacion> {
    const nueva = this.repo.create(this.toEntity(notificacion));
    const saved = await this.repo.save(nueva);
    return this.toDomain(saved);
  }

  async listar(): Promise<Notificacion[]> {
    const entities = await this.repo.find();
    return entities.map(this.toDomain);
  }

  async buscarPorId(id: string): Promise<Notificacion | null> {
    const entity = await this.repo.findOneBy({ id: Number(id) });
    return entity ? this.toDomain(entity) : null;
  }

  async marcarComoEnviada(id: string): Promise<void> {
    await this.repo.update({ id: Number(id) }, { enviada: true });
  }
}
