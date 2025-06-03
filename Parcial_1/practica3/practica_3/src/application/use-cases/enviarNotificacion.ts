import { INotificacionRepository } from "../../domain/repositories/INotificacionRepository";
import { Notificacion } from "../../domain/entities/Notificacion";
import { v4 as uuidv4 } from "uuid";

export class EnviarNotificacion {
  constructor(private readonly notificacionRepo: INotificacionRepository) {}

  async ejecutar(mensaje: string, capturaId: string): Promise<Notificacion> {
    const destinatario = "defaultDestinatario"; // Replace with actual logic to determine destinatario
    const notificacion = new Notificacion(
      uuidv4(),
      mensaje,
      new Date(),
      destinatario,
      false,
      capturaId
    );
    const creada = await this.notificacionRepo.crear(notificacion);

    // Aquí se podría enviar realmente una notificación (correo, app, etc.)
    await this.notificacionRepo.marcarComoEnviada(creada.id);
    return creada;
  }
}
