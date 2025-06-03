import { INotificacionRepository } from "../../domain/repositories/INotificacionRepository";
import { Notificacion } from "../../domain/entities/Notificacion";

export class NotificacionService {
  constructor(private readonly notiRepo: INotificacionRepository) {}

  async listarNotificaciones(): Promise<Notificacion[]> {
    return this.notiRepo.listar();
  }

  async crearNotificacion(notificacion: Notificacion): Promise<Notificacion> {
    return this.notiRepo.crear(notificacion);
  }
}
