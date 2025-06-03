import { Notificacion } from "../../../domain/entities/Notificacion";
import { INotificacionRepository } from "../../../domain/repositories/INotificacionRepository";
import { NotificacionModel } from "../models/NotificacionModel";

export class NotificacionRepositoryMongoose implements INotificacionRepository {
  async crear(notif: Notificacion): Promise<Notificacion> {
    const doc = await new NotificacionModel({
      mensaje: notif.mensaje,
      fecha: notif.fecha,
      destinatario: notif.destinatario,
      enviada: notif.enviada,
      capturaId: notif.capturaId,
    }).save();

    return new Notificacion(doc._id.toString(), doc.mensaje, doc.fecha, doc.destinatario, doc.enviada, doc.capturaId);
  }

  async listar(): Promise<Notificacion[]> {
    const docs = await NotificacionModel.find().lean();
    return docs.map((doc: any) =>
      new Notificacion(doc._id.toString(), doc.mensaje, doc.fecha, doc.destinatario, doc.enviada, doc.capturaId)
    );
  }

  async buscarPorId(id: string): Promise<Notificacion | null> {
    const doc = await NotificacionModel.findById(id).lean();
    if (!doc) return null;
    return new Notificacion(doc._id.toString(), doc.mensaje, doc.fecha, doc.destinatario, doc.enviada, doc.capturaId);
  }

  async marcarComoEnviada(id: string): Promise<void> {
    await NotificacionModel.updateOne({ _id: id }, { enviada: true });
  }
  
}
