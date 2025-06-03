import { Notificacion } from "../entities/Notificacion";

export interface INotificacionRepository {
  crear(notificacion: Notificacion): Promise<Notificacion>;
  listar(): Promise<Notificacion[]>;
  buscarPorId(id: string): Promise<Notificacion | null>;
  marcarComoEnviada(id: string): Promise<void>;
}
