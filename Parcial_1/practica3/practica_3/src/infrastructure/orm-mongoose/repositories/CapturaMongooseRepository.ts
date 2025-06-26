import { Captura } from "../../../domain/entities/Captura";
import { ICapturaRepository } from "../../../domain/repositories/ICapturaRepository";
import { CapturaModel } from "../models/CapturaModel";

export class CapturaRepositoryMongoose implements ICapturaRepository {
  async crear(captura: Captura): Promise<Captura> {
    const doc = await new CapturaModel({
      fecha: captura.fecha,
      urlImagen: captura.urlImagen,
      ubicacion: captura.ubicacion,
      plagaId: captura.plagaId,
    }).save();

    return new Captura(doc._id.toString(), doc.fecha, doc.urlImagen, doc.ubicacion, doc.plagaId);
  }

  async listar(): Promise<Captura[]> {
    const docs = await CapturaModel.find().lean();
    return docs.map((doc: any) =>
      new Captura(doc._id.toString(), doc.fecha, doc.urlImagen, doc.ubicacion, doc.plagaId)
    );
  }

  async buscarPorId(id: string): Promise<Captura | null> {
    const doc = await CapturaModel.findById(id).lean();
    if (!doc) return null;
    return new Captura(doc._id.toString(), doc.fecha, doc.urlImagen, doc.ubicacion, doc.plagaId);
  }

  async eliminar(id: string): Promise<void> {
    await CapturaModel.findByIdAndDelete(id);
  }
  

  async buscarPorPlaga(plagaId: string): Promise<Captura[]> {
    return await CapturaModel.find({ plagaId });
  }
  
}
